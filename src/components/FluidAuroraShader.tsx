import React, { useEffect, useRef } from 'react';
import type { ModuleId } from '../data/warRoomData.ts';
import type { PortalSite } from './PortalHeader.tsx';

export type ThemeMode = 'dark' | 'light';

interface FluidAuroraShaderProps {
  themeMode: ThemeMode;
  activeSite: PortalSite;
  activeModule: ModuleId;
  circuitBreakerActive?: boolean;
}

const VERTEX_SHADER_SOURCE = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  precision mediump float;
  varying vec2 v_uv;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_pointer;
  uniform float u_isLight;
  uniform vec3 u_primaryColor;
  uniform vec3 u_secondaryColor;
  uniform float u_breakerAlert;

  // Simplex-inspired harmonic wave field for fluid aurora
  float waveField(vec2 p, float t) {
    float v = 0.0;
    v += sin((p.x * 2.8 + t * 0.35)) * 0.45;
    v += cos((p.y * 3.1 - t * 0.28)) * 0.45;
    v += sin((p.x * 1.9 + p.y * 2.3 + t * 0.42)) * 0.35;
    vec2 q = p + vec2(sin(t * 0.2 + p.y * 2.0), cos(t * 0.24 + p.x * 2.0)) * 0.25;
    v += cos(length(q * 2.4) - t * 0.3) * 0.35;
    return v * 0.5 + 0.5;
  }

  void main() {
    vec2 aspect = vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
    vec2 uv = v_uv * aspect;
    vec2 ptr = u_pointer * aspect;

    float distToPtr = length(uv - ptr);
    float pointerGlow = exp(-distToPtr * 3.2);

    // Subtle refraction near cursor
    vec2 warpedUv = uv + normalize(uv - ptr + 0.0001) * pointerGlow * 0.025;

    float auroraA = waveField(warpedUv * 1.15, u_time);
    float auroraB = waveField(warpedUv * 1.65 + vec2(1.7, -1.2), u_time * 0.85);

    // Precision architectural grid field (44px equivalent cell density)
    vec2 gridCoord = fract(warpedUv * 14.0);
    float lineX = smoothstep(0.03, 0.0, abs(gridCoord.x - 0.5) - 0.47);
    float lineY = smoothstep(0.03, 0.0, abs(gridCoord.y - 0.5) - 0.47);
    float gridMask = clamp(lineX + lineY, 0.0, 1.0);

    // Modulate grid visibility by aurora + cursor proximity
    float activeGrid = gridMask * (0.18 + pointerGlow * 0.55 + auroraA * 0.15);

    // Dark obsidian vs. Alabaster light base canvas
    vec3 darkCanvas = vec3(0.027, 0.039, 0.071);   // #070A12
    vec3 lightCanvas = vec3(0.973, 0.980, 0.988);  // #F8FAFC

    vec3 primary = u_primaryColor;
    vec3 secondary = u_secondaryColor;
    if (u_breakerAlert > 0.5) {
      primary = mix(primary, vec3(0.957, 0.247, 0.369), 0.65); // Rose alert harmonic
    }

    // Compose dark mode color
    vec3 darkColor = darkCanvas;
    darkColor += primary * (auroraA * 0.13 + pointerGlow * 0.16);
    darkColor += secondary * (auroraB * 0.11);
    darkColor += mix(primary, secondary, 0.5) * activeGrid * 0.22;

    // Compose light mode color
    vec3 lightColor = lightCanvas;
    lightColor -= (vec3(1.0) - primary) * (auroraA * 0.07 + pointerGlow * 0.09);
    lightColor -= (vec3(1.0) - secondary) * (auroraB * 0.06);
    lightColor = mix(lightColor, primary * 0.65, activeGrid * 0.12);

    vec3 finalColor = mix(darkColor, lightColor, u_isLight);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function getPaletteForState(
  site: PortalSite,
  mod: ModuleId
): { primary: [number, number, number]; secondary: [number, number, number] } {
  if (site === 'automation-plan') {
    return {
      primary: [0.063, 0.725, 0.506], // Emerald #10B981
      secondary: [0.024, 0.714, 0.831], // Cyan #06B6D4
    };
  }
  if (site === 'war-room') {
    if (mod === 'coder') {
      return {
        primary: [0.388, 0.4, 0.945], // Indigo #6366F1
        secondary: [0.024, 0.714, 0.831], // Cyan #06B6D4
      };
    }
    if (mod === 'shipyard') {
      return {
        primary: [0.957, 0.247, 0.369], // Rose #F43F5E
        secondary: [0.063, 0.725, 0.506], // Emerald #10B981
      };
    }
  }
  // Default Home / Brain v2.0
  return {
    primary: [0.024, 0.714, 0.831], // Electric Cyan #06B6D4
    secondary: [0.388, 0.4, 0.945], // Indigo #6366F1
  };
}

export const FluidAuroraShader: React.FC<FluidAuroraShaderProps> = ({
  themeMode,
  activeSite,
  activeModule,
  circuitBreakerActive = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0.65,
    y: 0.35,
    targetX: 0.65,
    targetY: 0.35,
  });
  const stateRef = useRef({
    themeMode,
    activeSite,
    activeModule,
    circuitBreakerActive,
  });

  useEffect(() => {
    stateRef.current = {
      themeMode,
      activeSite,
      activeModule,
      circuitBreakerActive,
    };
  }, [themeMode, activeSite, activeModule, circuitBreakerActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isHeadless =
      typeof navigator !== 'undefined' &&
      (navigator.webdriver === true || /HeadlessChrome/i.test(navigator.userAgent));

    const handlePointerMove = (e: PointerEvent) => {
      const w = Math.max(window.innerWidth, 1);
      const h = Math.max(window.innerHeight, 1);
      pointerRef.current.targetX = e.clientX / w;
      pointerRef.current.targetY = 1.0 - e.clientY / h;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    let gl =
      (canvas.getContext('webgl', { alpha: false, antialias: false, depth: false }) as WebGLRenderingContext | null) ||
      (canvas.getContext('experimental-webgl', { alpha: false }) as WebGLRenderingContext | null);

    let animationFrameId = 0;
    let program: WebGLProgram | null = null;

    const compileShader = (ctx: WebGLRenderingContext, type: number, source: string) => {
      const shader = ctx.createShader(type);
      if (!shader) return null;
      ctx.shaderSource(shader, source);
      ctx.compileShader(shader);
      if (!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) {
        ctx.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const initWebGL = (ctx: WebGLRenderingContext) => {
      const vs = compileShader(ctx, ctx.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
      const fs = compileShader(ctx, ctx.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
      if (!vs || !fs) return null;
      const prog = ctx.createProgram();
      if (!prog) return null;
      ctx.attachShader(prog, vs);
      ctx.attachShader(prog, fs);
      ctx.linkProgram(prog);
      if (!ctx.getProgramParameter(prog, ctx.LINK_STATUS)) {
        return null;
      }
      ctx.useProgram(prog);

      const buffer = ctx.createBuffer();
      ctx.bindBuffer(ctx.ARRAY_BUFFER, buffer);
      ctx.bufferData(
        ctx.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        ctx.STATIC_DRAW
      );
      const posLoc = ctx.getAttribLocation(prog, 'a_position');
      ctx.enableVertexAttribArray(posLoc);
      ctx.vertexAttribPointer(posLoc, 2, ctx.FLOAT, false, 0, 0);
      return prog;
    };

    if (gl) {
      program = initWebGL(gl);
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(Math.floor(window.innerWidth * dpr), 1);
      const height = Math.max(Math.floor(window.innerHeight * dpr), 1);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        if (gl) {
          gl.viewport(0, 0, width, height);
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const startTime = performance.now();

    const renderFrame = (now: number) => {
      const elapsed = (now - startTime) * 0.001;
      const ptr = pointerRef.current;
      ptr.x += (ptr.targetX - ptr.x) * 0.08;
      ptr.y += (ptr.targetY - ptr.y) * 0.08;

      const current = stateRef.current;
      const palette = getPaletteForState(current.activeSite, current.activeModule);

      if (gl && program) {
        gl.useProgram(program);
        const uRes = gl.getUniformLocation(program, 'u_resolution');
        const uTime = gl.getUniformLocation(program, 'u_time');
        const uPtr = gl.getUniformLocation(program, 'u_pointer');
        const uLight = gl.getUniformLocation(program, 'u_isLight');
        const uPri = gl.getUniformLocation(program, 'u_primaryColor');
        const uSec = gl.getUniformLocation(program, 'u_secondaryColor');
        const uBrk = gl.getUniformLocation(program, 'u_breakerAlert');

        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, elapsed);
        gl.uniform2f(uPtr, ptr.x, ptr.y);
        gl.uniform1f(uLight, current.themeMode === 'light' ? 1.0 : 0.0);
        gl.uniform3f(uPri, palette.primary[0], palette.primary[1], palette.primary[2]);
        gl.uniform3f(uSec, palette.secondary[0], palette.secondary[1], palette.secondary[2]);
        gl.uniform1f(uBrk, current.circuitBreakerActive ? 1.0 : 0.0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      } else {
        // High-craft 2D Canvas Aurora & Precision Grid fallback if WebGL is unavailable
        const ctx2d = canvas.getContext('2d');
        if (ctx2d) {
          const w = canvas.width;
          const h = canvas.height;
          ctx2d.fillStyle = current.themeMode === 'light' ? '#F8FAFC' : '#070A12';
          ctx2d.fillRect(0, 0, w, h);

          const grad = ctx2d.createRadialGradient(
            ptr.x * w,
            (1 - ptr.y) * h,
            10,
            ptr.x * w,
            (1 - ptr.y) * h,
            Math.max(w, h) * 0.55
          );
          const alpha = current.themeMode === 'light' ? 0.12 : 0.18;
          grad.addColorStop(
            0,
            `rgba(${Math.round(palette.primary[0] * 255)}, ${Math.round(
              palette.primary[1] * 255
            )}, ${Math.round(palette.primary[2] * 255)}, ${alpha})`
          );
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx2d.fillStyle = grad;
          ctx2d.fillRect(0, 0, w, h);
        }
      }

      if (!isHeadless) {
        animationFrameId = window.requestAnimationFrame(renderFrame);
      }
    };

    renderFrame(performance.now());

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
    const handleContextRestored = () => {
      gl = canvas.getContext('webgl') as WebGLRenderingContext | null;
      if (gl) {
        program = initWebGL(gl);
        resize();
        renderFrame(performance.now());
      }
    };

    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [themeMode, activeSite, activeModule, circuitBreakerActive]);

  return (
    <canvas
      ref={canvasRef}
      data-testid="ambient-shader-canvas"
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

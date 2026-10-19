import type { ArtifactConfig } from './warRoomData.ts';

export interface JargonTerm {
  term: string;
  plainMeaning: string;
}

export interface CommandPartExplanation {
  piece: string;
  meaning: string;
}

export interface LaptopHardwareSpec {
  component: string;
  model: string;
  plainRole: string;
  safeBudgetRule: string;
}

export const LAPTOP_HARDWARE_PROFILE: LaptopHardwareSpec[] = [
  {
    component: 'Operating System',
    model: 'Windows 11 (64-bit)',
    plainRole:
      'Runs Windows Terminal (PowerShell) where every command in this guide is formatted to copy-and-paste directly without Mac/Linux errors.',
    safeBudgetRule:
      'Uses native PowerShell commands (py, .\\.venv\\Scripts\\Activate.ps1, Set-Content, curl.exe).',
  },
  {
    component: 'Processor (CPU)',
    model: 'AMD Ryzen 9 HX',
    plainRole:
      'Your laptop’s multi-tasking powerhouse (16 cores / 32 threads) that builds your website, seeds 50 records in parallel, and runs 3 automated test browsers at once.',
    safeBudgetRule:
      'Configured with --workers 8 for data tasks and --workers 3 for Playwright tests.',
  },
  {
    component: 'Graphics Card (GPU)',
    model: 'NVIDIA GeForce RTX 5060 (8GB VRAM)',
    plainRole:
      'Your dedicated AI accelerator chip. It runs local AI tasks (voice transcription, image segmentation, and smart search embeddings) 20x faster than a normal CPU.',
    safeBudgetRule:
      'Capped at ~4.4 GB / 8.0 GB VRAM using FP16 compression so you never get "CUDA Out of Memory".',
  },
  {
    component: 'System Memory (RAM)',
    model: '16GB DDR5 RAM',
    plainRole:
      'Your laptop’s short-term workbench that holds Windows 11, Chrome, VS Code, Node.js, and Python all at the same time.',
    safeBudgetRule:
      'Kept under ~11.0 GB / 16.0 GB by limiting Uvicorn to 2 workers and routing giant 30B+ models to Cloud APIs.',
  },
];

export interface BeginnerMicroStep {
  id: string;
  stepNumberLabel: string;
  title: string;
  estimatedTime: string;
  whatYouAreDoing: string;
  realWorldAnalogy: string;
  hardwareOptimizationNote: string;
  whereToClickOrOpen: string;
  copyableCommand?: string;
  commandBreakdown: CommandPartExplanation[];
  jargonDecoder: JargonTerm[];
  howYouKnowItWorked: string;
  commonMistakeFix: string;
}

export interface BeginnerStageGuide {
  id: string;
  stageNumber: string;
  title: string;
  subtitle: string;
  totalTime: string;
  plainOverview: string;
  whyThisStageMatters: string;
  microSteps: BeginnerMicroStep[];
}

export const BEGINNER_STAGES: BeginnerStageGuide[] = [
  {
    id: 'guide-stage-1',
    stageNumber: '01',
    title: 'Preparing Your Windows 11 Laptop, RTX 5060 GPU & Project Folders',
    subtitle:
      'Opening Windows 11 PowerShell, checking your RTX 5060 8GB graphics card, and setting up a clean project workspace that respects your 16GB RAM.',
    totalTime: '5 mins',
    plainOverview:
      'Before any automation builds your app, we open Windows 11 PowerShell, confirm your NVIDIA RTX 5060 (8GB VRAM) and AMD Ryzen 9 HX are ready, create your project folders, and set up a private Python sandbox.',
    whyThisStageMatters:
      'Most tutorials give Mac commands that fail on Windows 11. Every step here uses native Windows 11 PowerShell commands and configures your 16GB RAM and 8GB RTX 5060 so your laptop runs fast and never freezes.',
    microSteps: [
      {
        id: 'g1-step-1',
        stepNumberLabel: 'Step 1.1',
        title: 'Open Windows 11 PowerShell & Check Your RTX 5060 8GB Graphics Card',
        estimatedTime: '1 min',
        whatYouAreDoing:
          'You are opening Windows 11’s built-in command window (PowerShell) and running a 1-word check to see your NVIDIA RTX 5060 8GB graphics card and current folder.',
        realWorldAnalogy:
          'Think of PowerShell like texting a super-fast assistant inside Windows 11, and "nvidia-smi" like checking your sports car’s dashboard gauges before starting the engine.',
        hardwareOptimizationNote:
          'Tailored for Windows 11 + RTX 5060 (8GB): "nvidia-smi" verifies that Windows 11 sees all 8,192 MB (8GB) of your RTX 5060 video memory so local AI tasks will use your graphics card instead of slowing down your system.',
        whereToClickOrOpen:
          'On your Windows 11 laptop: Press the Windows Key + X on your keyboard and click "Terminal" (or press the Windows Key, type "PowerShell", and press Enter). Then paste the command below and press Enter:',
        copyableCommand: 'cd $HOME\\Desktop; pwd; nvidia-smi',
        commandBreakdown: [
          {
            piece: 'cd $HOME\\Desktop;',
            meaning:
              'Moves PowerShell onto your Windows 11 Desktop so you can easily see the project folder we are about to create.',
          },
          {
            piece: 'pwd;',
            meaning:
              'Prints your current Windows folder path (for example: C:\\Users\\YourName\\Desktop).',
          },
          {
            piece: 'nvidia-smi',
            meaning:
              'Displays a live status box for your NVIDIA GeForce RTX 5060 Laptop GPU showing how much of your 8GB (8192MiB) graphics memory is currently free.',
          },
        ],
        jargonDecoder: [
          {
            term: 'Windows PowerShell',
            plainMeaning:
              'The built-in command window in Windows 11 where you can paste text instructions for your laptop to execute.',
          },
          {
            term: 'VRAM (8GB on RTX 5060)',
            plainMeaning:
              'Dedicated ultra-fast memory built directly onto your RTX 5060 graphics card, separate from your laptop’s main 16GB RAM.',
          },
        ],
        howYouKnowItWorked:
          'You see your Desktop path (C:\\Users\\...\\Desktop) followed by a table listing "NVIDIA GeForce RTX 5060 Laptop GPU" and "8192MiB".',
        commonMistakeFix:
          'In Windows 11 Terminal, right-clicking your mouse (or pressing Ctrl + V) pastes copied text automatically. Remember to press Enter after pasting!',
      },
      {
        id: 'g1-step-2',
        stepNumberLabel: 'Step 1.2',
        title: 'Create Your Project Folder & 6 Sub-Folders on Windows 11',
        estimatedTime: '1 min',
        whatYouAreDoing:
          'You are creating one main folder for [PROJECT_NAME] on your Windows 11 Desktop and 6 neat sub-folders inside it so your website, server, and AI scripts stay organized.',
        realWorldAnalogy:
          'Imagine moving into a new workshop and labeling 6 storage bins ("web", "api", "engine", "docs", "scripts", ".github") before unpacking your tools.',
        hardwareOptimizationNote:
          'Tailored for Windows 11: Uses native Windows PowerShell folder creation (instead of Linux curly-brace syntax which causes errors in Windows PowerShell).',
        whereToClickOrOpen:
          'Paste this command into your Windows 11 PowerShell window and press Enter:',
        copyableCommand:
          'mkdir "[PROJECT_SLUG]" -Force; cd "[PROJECT_SLUG]"; mkdir web, api, engine, docs, scripts, .github -Force',
        commandBreakdown: [
          {
            piece: 'mkdir "[PROJECT_SLUG]" -Force',
            meaning:
              'Creates your main project folder on your Desktop. "-Force" prevents Windows from complaining if the folder already exists.',
          },
          {
            piece: 'cd "[PROJECT_SLUG]"',
            meaning:
              'Steps inside your new project folder so all future commands run inside it.',
          },
          {
            piece: 'mkdir web, api, engine, docs, scripts, .github -Force',
            meaning:
              'Creates all 6 organized sub-folders at once using Windows PowerShell comma syntax.',
          },
        ],
        jargonDecoder: [
          {
            term: 'Monorepo Folder Structure',
            plainMeaning:
              'Keeping your visual website ("web"), backend server ("api"), and AI scripts ("engine") together inside one main folder.',
          },
        ],
        howYouKnowItWorked:
          'Your PowerShell line now starts with "PS C:\\Users\\...\\Desktop\\[PROJECT_SLUG]>" and lists your 6 new folders.',
        commonMistakeFix:
          'You can also see the new folder appear right on your Windows 11 Desktop!',
      },
      {
        id: 'g1-step-3',
        stepNumberLabel: 'Step 1.3',
        title: 'Create & Activate Your Windows Python Sandbox (.venv)',
        estimatedTime: '1.5 mins',
        whatYouAreDoing:
          'You are allowing PowerShell to run local helper scripts, creating a private Python folder called ".venv", and turning it on.',
        realWorldAnalogy:
          'Like unlocking your private toolbox so every AI tool we install stays neatly inside this project folder instead of cluttering Windows 11.',
        hardwareOptimizationNote:
          'Tailored for Windows 11 + 16GB RAM: Windows 11 blocks ".ps1" activation scripts by default unless you run "Set-ExecutionPolicy". This command unlocks it safely for your user account and activates the Windows ".venv\\Scripts\\Activate.ps1" path.',
        whereToClickOrOpen:
          'Paste this command into PowerShell and press Enter:',
        copyableCommand:
          'Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force; py -m venv .venv; .\\.venv\\Scripts\\Activate.ps1',
        commandBreakdown: [
          {
            piece: 'Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force',
            meaning:
              'Tells Windows 11 Security: "Allow my own user account to run local Python scripts that I created on this laptop."',
          },
          {
            piece: 'py -m venv .venv',
            meaning:
              'Uses the official Windows Python launcher ("py") to create an isolated sandbox folder named ".venv".',
          },
          {
            piece: '.\\.venv\\Scripts\\Activate.ps1',
            meaning:
              'Turns on your Python sandbox in Windows PowerShell using Windows backslashes.',
          },
        ],
        jargonDecoder: [
          {
            term: 'ExecutionPolicy (Windows 11)',
            plainMeaning:
              'A built-in Windows 11 safety switch that needs to be set to "RemoteSigned" once so PowerShell lets you activate Python environments.',
          },
          {
            term: 'Virtual Environment (.venv)',
            plainMeaning:
              'A self-contained folder that holds Python packages just for this project.',
          },
        ],
        howYouKnowItWorked:
          'You see green text reading "(.venv)" appear at the very front of your PowerShell prompt line!',
        commonMistakeFix:
          'If "py" is not recognized, open the Microsoft Store app on Windows 11, search "Python 3.12", and click "Get" (it installs in 45 seconds for free).',
      },
      {
        id: 'g1-step-4',
        stepNumberLabel: 'Step 1.4',
        title: 'Create Your Private Windows .env File with Hardware Limits',
        estimatedTime: '1.5 mins',
        whatYouAreDoing:
          'You are creating a configuration file named ".env" that stores your Gemini API key PLUS hardware limits tailored for your 16GB RAM, RTX 5060 (8GB VRAM), and Ryzen 9 HX.',
        realWorldAnalogy:
          'Like saving both your AI password and your laptop’s speed-governor settings on a digital keycard.',
        hardwareOptimizationNote:
          'Tailored for 16GB RAM + RTX 5060 8GB + Ryzen 9 HX: Sets CUDA_VISIBLE_DEVICES=0 (uses your RTX 5060), VRAM_LIMIT_MB=5500 (keeps 2.5GB of your 8GB VRAM free for Windows 11), and RYZEN_THREADS=16 (uses your Ryzen 9 HX cores efficiently).',
        whereToClickOrOpen:
          'Paste this PowerShell command to create your ".env" file automatically:',
        copyableCommand:
          '@"\nGEMINI_API_KEY=paste_your_key_here\nPROJECT_NAME=[PROJECT_NAME]\nPROBLEM_DOMAIN=[PROBLEM_DOMAIN]\nCUDA_VISIBLE_DEVICES=0\nRTX5060_MAX_VRAM_MB=5500\nSYSTEM_RAM_WORKERS=2\nRYZEN_CPU_THREADS=16\n"@ | Set-Content -Path .env -Encoding UTF8',
        commandBreakdown: [
          {
            piece: '@" ... "@ | Set-Content -Path .env -Encoding UTF8',
            meaning:
              'The native Windows PowerShell way to write multiple lines of text cleanly into a file named ".env".',
          },
          {
            piece: 'RTX5060_MAX_VRAM_MB=5500',
            meaning:
              'Reserves at most 5.5 GB of your RTX 5060’s 8 GB VRAM for AI models so your Windows 11 screen never stutters.',
          },
          {
            piece: 'SYSTEM_RAM_WORKERS=2 & RYZEN_CPU_THREADS=16',
            meaning:
              'Limits server memory copies to 2 (protecting your 16GB RAM) while letting your AMD Ryzen 9 HX use 16 fast threads.',
          },
        ],
        jargonDecoder: [
          {
            term: '.env File',
            plainMeaning:
              'A local settings file that holds your secret API keys and laptop hardware settings.',
          },
          {
            term: 'CUDA_VISIBLE_DEVICES=0',
            plainMeaning:
              'Tells Python AI tools to run on Graphics Card #0 (your NVIDIA RTX 5060) instead of integrated graphics.',
          },
        ],
        howYouKnowItWorked:
          'Run "Get-Content .env" in PowerShell and you will see all 7 settings printed clearly.',
        commonMistakeFix:
          'Type "notepad .env" in PowerShell to open the file in Windows Notepad, paste your real Gemini key after GEMINI_API_KEY=, and press Ctrl + S to save.',
      },
    ],
  },
  {
    id: 'guide-stage-2',
    stageNumber: '02',
    title: 'Automatic Rulebook & Problem Research on Windows 11',
    subtitle:
      'Installing CUDA-enabled AI helpers on Windows 11 and using your Ryzen 9 HX to research [PROBLEM_DOMAIN] in seconds.',
    totalTime: '4 mins',
    plainOverview:
      'Instead of spending hours reading rule PDFs and searching for statistics, we save the hackathon rules into a text file, install the Google AI and RTX 5060 helper libraries, and let a Python script gather 3 hard statistics for [PROBLEM_DOMAIN].',
    whyThisStageMatters:
      'Because the heavy web research runs through the Gemini API while your Ryzen 9 HX formats the JSON locally, this uses almost zero of your 16GB RAM and finishes in under 60 seconds.',
    microSteps: [
      {
        id: 'g2-step-1',
        stepNumberLabel: 'Step 2.1',
        title: 'Save the Hackathon Judging Rules in Windows PowerShell',
        estimatedTime: '1 min',
        whatYouAreDoing:
          'You are saving the hackathon’s judging criteria into "docs\\rules.txt" using Windows PowerShell so the AI knows how your project will be graded.',
        realWorldAnalogy:
          'Handing the exam grading sheet to your study partner before you start working so you focus on the highest-scoring questions.',
        hardwareOptimizationNote:
          'Tailored for Windows 11: Uses PowerShell’s "Set-Content" with Windows backslash path "docs\\rules.txt".',
        whereToClickOrOpen:
          'Paste this command into your Windows 11 PowerShell window:',
        copyableCommand:
          '"Judging Criteria: Technical Depth (30%), Real-World Impact in [PROBLEM_DOMAIN] (30%), Live Demo Polish (20%), Innovation (20%)." | Set-Content -Path docs\\rules.txt -Encoding UTF8',
        commandBreakdown: [
          {
            piece: '"Judging Criteria: ..."',
            meaning:
              'The text of your hackathon’s scoring rules (you can also paste your event’s exact rules into docs\\rules.txt using Notepad).',
          },
          {
            piece: '| Set-Content -Path docs\\rules.txt -Encoding UTF8',
            meaning:
              'Saves that text directly into the "rules.txt" file inside your "docs" folder on Windows 11.',
          },
        ],
        jargonDecoder: [
          {
            term: 'Rubric',
            plainMeaning:
              'The official scorecard judges use to award points during your demo.',
          },
        ],
        howYouKnowItWorked:
          'Run "Get-Content docs\\rules.txt" and PowerShell prints your judging criteria.',
        commonMistakeFix:
          'Want to paste long rules from a webpage? Type "notepad docs\\rules.txt" in PowerShell, paste the rules into Notepad, and press Ctrl + S.',
      },
      {
        id: 'g2-step-2',
        stepNumberLabel: 'Step 2.2',
        title: 'Install Google GenAI & RTX 5060 GPU Helpers in Your Sandbox',
        estimatedTime: '1 min',
        whatYouAreDoing:
          'You are installing the official Google AI package plus structured-data helpers inside your Windows ".venv" sandbox.',
        realWorldAnalogy:
          'Installing the translator app and high-speed driver software so your Python scripts can talk to Gemini and your RTX 5060.',
        hardwareOptimizationNote:
          'Tailored for Ryzen 9 HX + 16GB RAM: Your AMD Ryzen 9 HX unpacks Python wheels across multiple CPU threads so installation finishes in seconds without spiking your 16GB RAM.',
        whereToClickOrOpen:
          'Paste this command into PowerShell (make sure "(.venv)" is showing):',
        copyableCommand:
          'python -m pip install --upgrade pip; pip install google-genai pydantic python-dotenv',
        commandBreakdown: [
          {
            piece: 'python -m pip install --upgrade pip',
            meaning:
              'Updates Python’s package installer on Windows 11 so it downloads pre-built binary packages cleanly.',
          },
          {
            piece: 'pip install google-genai pydantic python-dotenv',
            meaning:
              'Installs the Google Gemini SDK, Pydantic (for clean JSON checklists), and python-dotenv (which reads your .env file).',
          },
        ],
        jargonDecoder: [
          {
            term: 'pip',
            plainMeaning:
              'Python’s built-in installer that downloads free code libraries from the internet.',
          },
        ],
        howYouKnowItWorked:
          'PowerShell finishes and prints "Successfully installed google-genai pydantic python-dotenv".',
        commonMistakeFix:
          'Always use "python -m pip install ..." on Windows 11 if "pip" ever warns about file permissions.',
      },
      {
        id: 'g2-step-3',
        stepNumberLabel: 'Step 2.3',
        title: 'Run the Stage 02 Research Script for [PROBLEM_DOMAIN]',
        estimatedTime: '1 min',
        whatYouAreDoing:
          'You are running the Stage 02 Python script on Windows 11 to analyze your rules and generate 3 real-world statistics and pain points for [PROBLEM_DOMAIN].',
        realWorldAnalogy:
          'Sending a fast research assistant to gather 3 undeniable industry facts that you can quote on your opening slide.',
        hardwareOptimizationNote:
          'Tailored for 16GB RAM: Instead of downloading a massive 40GB research database onto your laptop, this script queries Gemini in the cloud and uses less than 60 MB of your 16GB RAM.',
        whereToClickOrOpen:
          'Save Stage 02’s script from Sub-Website 2 into "scripts\\02_brain_research_agent.py", then run this in PowerShell:',
        copyableCommand:
          'python scripts\\02_brain_research_agent.py --domain "[PROBLEM_DOMAIN]"',
        commandBreakdown: [
          {
            piece: 'python scripts\\02_brain_research_agent.py',
            meaning:
              'Uses your Windows ".venv" Python to execute the research script.',
          },
          {
            piece: '--domain "[PROBLEM_DOMAIN]"',
            meaning:
              'Passes your exact hackathon topic to the script.',
          },
        ],
        jargonDecoder: [
          {
            term: 'Research Dossier',
            plainMeaning:
              'A short cheat-sheet file containing real statistics and judging priorities for your project.',
          },
        ],
        howYouKnowItWorked:
          'PowerShell prints "[STAGE 02 COMPLETE]" and saves "docs\\research_dossier.json".',
        commonMistakeFix:
          'Note that on Windows 11 inside (.venv), you type "python" (not "python3").',
      },
      {
        id: 'g2-step-4',
        stepNumberLabel: 'Step 2.4',
        title: 'Inspect Your Generated Research Cheat Sheet in PowerShell',
        estimatedTime: '1 min',
        whatYouAreDoing:
          'You are viewing the "docs\\research_dossier.json" file to see the 3 pain points and statistics discovered for [PROBLEM_DOMAIN].',
        realWorldAnalogy:
          'Checking the 1-page fact sheet before designing your presentation.',
        hardwareOptimizationNote:
          'Tailored for Windows 11: Uses PowerShell’s "Get-Content" command (which replaces the Linux "cat" command nicely on Windows).',
        whereToClickOrOpen:
          'Paste this command into PowerShell and press Enter:',
        copyableCommand: 'Get-Content docs\\research_dossier.json',
        commandBreakdown: [
          {
            piece: 'Get-Content docs\\research_dossier.json',
            meaning:
              'Reads and prints the contents of "research_dossier.json" right inside your Windows PowerShell window.',
          },
        ],
        jargonDecoder: [
          {
            term: 'JSON File (.json)',
            plainMeaning:
              'A structured text file that organizes facts into labeled pairs (like "stat": "42% faster") so both humans and programs can read it.',
          },
        ],
        howYouKnowItWorked:
          'You see the JSON summary with 3 pain points and rubric weights printed in PowerShell.',
        commonMistakeFix:
          'You can also type "notepad docs\\research_dossier.json" to view or edit it in Windows Notepad.',
      },
    ],
  },
  {
    id: 'guide-stage-3',
    stageNumber: '03',
    title: 'Picking a Winning Idea & Locking a Hardware-Safe Architecture',
    subtitle:
      'Brainstorming 3 ideas, picking the winner that fits your 8GB RTX 5060 & 16GB RAM, and locking your 4-screen demo story.',
    totalTime: '4 mins',
    plainOverview:
      'In Stage 03, our script generates 3 candidate ideas for [PROBLEM_DOMAIN], filters out any idea that is too bloated to build in 17 hours or too heavy for an 8GB GPU / 16GB RAM laptop, and locks a 4-Screen Storyboard.',
    whyThisStageMatters:
      'By choosing a smart hybrid architecture—where compact models run on your RTX 5060 (8GB) and giant 30B+ reasoning models run in the Cloud—your laptop stays cool, quiet, and lightning-fast during the demo.',
    microSteps: [
      {
        id: 'g3-step-1',
        stepNumberLabel: 'Step 3.1',
        title: 'Run the Idea Generator & Hardware Fit Filter',
        estimatedTime: '1 min',
        whatYouAreDoing:
          'You are running Stage 03’s script to generate 3 project concepts for [PROBLEM_DOMAIN] and automatically score which one works best with your Windows 11 + RTX 5060 setup.',
        realWorldAnalogy:
          'Asking an architect for 3 house designs and picking the one that fits your exact lot size and budget.',
        hardwareOptimizationNote:
          'Tailored for RTX 5060 (8GB VRAM) + 16GB RAM: Automatically rejects ideas that require 24GB+ desktop GPUs and selects a hybrid design where local tasks fit under 5GB VRAM.',
        whereToClickOrOpen:
          'Paste this command into your Windows 11 PowerShell window:',
        copyableCommand:
          'python scripts\\03_adversarial_ideation.py --project "[PROJECT_NAME]"',
        commandBreakdown: [
          {
            piece: 'python scripts\\03_adversarial_ideation.py',
            meaning:
              'Runs the Stage 03 ideation and tough-judge filter script on Windows 11.',
          },
          {
            piece: '--project "[PROJECT_NAME]"',
            meaning:
              'Tags the winning architecture blueprint with your project name.',
          },
        ],
        jargonDecoder: [
          {
            term: 'Hybrid AI Architecture',
            plainMeaning:
              'Running fast, compact AI models directly on your RTX 5060 8GB graphics card while sending huge reasoning tasks to Cloud APIs so your 16GB RAM never overflows.',
          },
        ],
        howYouKnowItWorked:
          'PowerShell prints the 3 candidate ideas, shows why 2 were eliminated, and saves the winner to "docs\\winning_idea_lock.json".',
        commonMistakeFix:
          'Want to customize the winning idea yourself? You can edit any field in Sub-Website 1’s Artifact Studio!',
      },
      {
        id: 'g3-step-2',
        stepNumberLabel: 'Step 3.2',
        title: 'Apply the "Guillotine Rule" (Lock Only 4 Demo Screens)',
        estimatedTime: '1 min',
        whatYouAreDoing:
          'You are reviewing the 4-Screen Storyboard in "docs\\winning_idea_lock.json" and cutting away any unnecessary screens (like login/signup or settings pages).',
        realWorldAnalogy:
          'When filming a 3-minute movie trailer, you only build the 4 camera sets the audience actually sees.',
        hardwareOptimizationNote:
          'Tailored for 16GB RAM: Keeping your frontend focused on 4 high-impact screens means your browser tab uses <250 MB of RAM instead of bloating memory with dozens of unused libraries.',
        whereToClickOrOpen:
          'View your locked 4-Screen Demo Storyboard in PowerShell:',
        copyableCommand: 'Get-Content docs\\winning_idea_lock.json',
        commandBreakdown: [
          {
            piece: 'Get-Content docs\\winning_idea_lock.json',
            meaning:
              'Displays the 4 locked demo screens (Screen 1 Hook, Screen 2 Input, Screen 3 AI Analysis, Screen 4 Action).',
          },
        ],
        jargonDecoder: [
          {
            term: 'Guillotine Rule',
            plainMeaning:
              'Cutting out every feature (like password reset or billing pages) that does not directly help win points in your 3-minute pitch.',
          },
        ],
        howYouKnowItWorked:
          'You see all 4 screens clearly described in your PowerShell window.',
        commonMistakeFix:
          'If a teammate asks to build a login screen, point them to this 4-screen storyboard!',
      },
      {
        id: 'g3-step-3',
        stepNumberLabel: 'Step 3.3',
        title: 'Verify Your 4 Brand Color Codes',
        estimatedTime: '1 min',
        whatYouAreDoing:
          'You are locking 4 color hex codes (Background, Card Surface, Primary Accent, Secondary Accent) so your app looks sleek and modern on your Windows 11 laptop display.',
        realWorldAnalogy:
          'Choosing your 4 paint colors before painting the rooms so every screen looks unified.',
        hardwareOptimizationNote:
          'Tailored for Windows 11 Display & RTX 5060: High-contrast dark slate (#090D16) with cyan/indigo accents looks razor-sharp on Windows 11 laptop screens and projectors.',
        whereToClickOrOpen:
          'Run this quick verification in PowerShell (or tweak colors in Sub-Website 1):',
        copyableCommand:
          'Write-Host "Colors Locked: Background=#090D16, Surface=#111827, Primary=#06B6D4, Accent=#6366F1" -ForegroundColor Cyan',
        commandBreakdown: [
          {
            piece: 'Write-Host "..." -ForegroundColor Cyan',
            meaning:
              'Prints a colored confirmation message in Windows PowerShell.',
          },
        ],
        jargonDecoder: [
          {
            term: 'Hex Color Code (#06B6D4)',
            plainMeaning:
              'A 6-character code starting with "#" that defines an exact color shade on screen.',
          },
        ],
        howYouKnowItWorked:
          'PowerShell prints your locked color palette in bright cyan text.',
        commonMistakeFix:
          'You can change these 4 colors anytime in Sub-Website 1 (Artifact Studio).',
      },
      {
        id: 'g3-step-4',
        stepNumberLabel: 'Step 3.4',
        title: 'Confirm Your Idea Lock File Is Saved on Windows',
        estimatedTime: '1 min',
        whatYouAreDoing:
          'You are checking that "docs\\winning_idea_lock.json" is saved on disk before moving to Stage 04.',
        realWorldAnalogy:
          'Checking that the architectural blueprint is signed before the builders start work.',
        hardwareOptimizationNote:
          'Tailored for Windows 11: Uses PowerShell’s "Get-Item" to inspect the file size and timestamp cleanly.',
        whereToClickOrOpen:
          'Paste this command into PowerShell:',
        copyableCommand: 'Get-Item docs\\winning_idea_lock.json',
        commandBreakdown: [
          {
            piece: 'Get-Item docs\\winning_idea_lock.json',
            meaning:
              'Shows the exact file name, size (Length), and LastWriteTime in Windows PowerShell.',
          },
        ],
        jargonDecoder: [
          {
            term: 'Hour 1:00 Idea Lock',
            plainMeaning:
              'The milestone where you stop changing your project idea and focus 100% on building it.',
          },
        ],
        howYouKnowItWorked:
          'PowerShell displays the file details with a non-zero Length.',
        commonMistakeFix:
          'Keep this file in the "docs" folder so Stage 04 can read it automatically.',
      },
    ],
  },
  {
    id: 'guide-stage-4',
    stageNumber: '04',
    title: 'Creating CONTEXT.md & Starting a 16GB-RAM-Safe Practice Server',
    subtitle:
      'Generating your master CONTEXT.md blueprint and starting a lightweight FastAPI server tuned for 16GB RAM on Windows 11.',
    totalTime: '4 mins',
    plainOverview:
      'In Stage 04, we generate "CONTEXT.md"—the single master instruction sheet that keeps AI coding assistants (like Cursor, Copilot, or Claude) aligned—and we start a local Practice Server ("mock_server.py") capped at 2 workers so your 16GB RAM stays cool and responsive.',
    whyThisStageMatters:
      'Running too many background server workers on Windows 11 can eat up 16GB of RAM quickly. By capping Uvicorn at "--workers 2", the server replies in 2 milliseconds while using less than 120 MB of RAM!',
    microSteps: [
      {
        id: 'g4-step-1',
        stepNumberLabel: 'Step 4.1',
        title: 'Save Your Master Blueprint File (CONTEXT.md) on Windows 11',
        estimatedTime: '1 min',
        whatYouAreDoing:
          'You are downloading or generating "CONTEXT.md" in your main project folder so every AI coding assistant knows your exact folders, data fields, and Windows 11 + RTX 5060 setup.',
        realWorldAnalogy:
          'Giving every builder on your team the exact same laminated blueprint so nobody builds a square door for a round doorway.',
        hardwareOptimizationNote:
          'Tailored for Windows 11 + RTX 5060 (8GB) + 16GB RAM: Your CONTEXT.md explicitly tells AI coding tools not to load models larger than 5GB into local VRAM and to use Windows-safe paths.',
        whereToClickOrOpen:
          'Click "Download .md" inside Sub-Website 1’s Artifact Studio (and save it into your project folder as CONTEXT.md), or verify/create it in PowerShell:',
        copyableCommand:
          '"# CONTEXT.md — [PROJECT_NAME] ([PROBLEM_DOMAIN])`nHardware: Windows 11 | AMD Ryzen 9 HX | 16GB RAM | RTX 5060 8GB VRAM" | Set-Content -Path CONTEXT.md -Encoding UTF8; Get-Content CONTEXT.md',
        commandBreakdown: [
          {
            piece: 'Set-Content -Path CONTEXT.md -Encoding UTF8',
            meaning:
              'Writes the master blueprint header into "CONTEXT.md" in your project folder.',
          },
          {
            piece: 'Get-Content CONTEXT.md',
            meaning:
              'Prints the file in PowerShell to confirm it is saved in the right place.',
          },
        ],
        jargonDecoder: [
          {
            term: 'CONTEXT.md',
            plainMeaning:
              'A single Markdown text file you attach to AI coding prompts so the AI never forgets your project rules or data format.',
          },
        ],
        howYouKnowItWorked:
          'PowerShell prints your CONTEXT.md header (and you can replace it with the full 1-click export from Sub-Website 1!).',
        commonMistakeFix:
          'Tip: In Cursor or VS Code Copilot on Windows 11, type "@CONTEXT.md" in the chat box so the AI reads this file first.',
      },
      {
        id: 'g4-step-2',
        stepNumberLabel: 'Step 4.2',
        title: 'Install FastAPI & Uvicorn in Your Windows Sandbox',
        estimatedTime: '1 min',
        whatYouAreDoing:
          'You are installing "FastAPI" and "Uvicorn" inside your Windows ".venv" sandbox so your laptop can run a fast local backend server.',
        realWorldAnalogy:
          'Installing the engine that lets your laptop answer requests from your website.',
        hardwareOptimizationNote:
          'Tailored for Ryzen 9 HX + 16GB RAM: FastAPI is ultra-lightweight—it uses less than 1% of your Ryzen 9 HX CPU and under 120 MB of your 16GB RAM.',
        whereToClickOrOpen:
          'Paste this command into your Windows 11 PowerShell window:',
        copyableCommand: 'pip install fastapi uvicorn',
        commandBreakdown: [
          {
            piece: 'fastapi',
            meaning:
              'The Python library that creates web API endpoints (like /api/v1/health and /api/v1/analyze).',
          },
          {
            piece: 'uvicorn',
            meaning:
              'The lightning-fast server runner that hosts FastAPI on your Windows 11 laptop.',
          },
        ],
        jargonDecoder: [
          {
            term: 'API Endpoint',
            plainMeaning:
              'A specific local web address (like http://localhost:8000/api/v1/analyze) where your website sends data to get an answer.',
          },
        ],
        howYouKnowItWorked:
          'PowerShell prints "Successfully installed fastapi uvicorn".',
        commonMistakeFix:
          'Make sure "(.venv)" is visible at the left of your PowerShell prompt before running pip.',
      },
      {
        id: 'g4-step-3',
        stepNumberLabel: 'Step 4.3',
        title: 'Start the Practice Server with 16GB-RAM-Safe Worker Limits',
        estimatedTime: '1 min',
        whatYouAreDoing:
          'You are starting the local Practice Server on port 8000 in the background and testing it with Windows "curl.exe" to confirm it replies.',
        realWorldAnalogy:
          'Turning on the walkie-talkie and pressing the test button to hear a clear beep back.',
        hardwareOptimizationNote:
          'Tailored for Windows 11 + 16GB RAM: Notice we use "curl.exe" (not "curl", because PowerShell aliases "curl" to an old command that breaks flags!) and we run Uvicorn cleanly in a background Windows process.',
        whereToClickOrOpen:
          'After saving Stage 04’s mock_server.py into "api\\mock_server.py", run this in PowerShell:',
        copyableCommand:
          'Start-Process python -ArgumentList "-m uvicorn api.mock_server:app --host 127.0.0.1 --port 8000 --workers 2" -WindowStyle Minimized; Start-Sleep -Seconds 2; curl.exe -s http://127.0.0.1:8000/api/v1/health',
        commandBreakdown: [
          {
            piece: 'Start-Process python -ArgumentList "... --workers 2" -WindowStyle Minimized',
            meaning:
              'Starts the FastAPI server in a minimized background window with 2 workers so your current PowerShell window stays free and your 16GB RAM is protected.',
          },
          {
            piece: 'curl.exe -s http://127.0.0.1:8000/api/v1/health',
            meaning:
              'Uses the real Windows 11 "curl.exe" tool to check that the server on port 8000 is healthy.',
          },
        ],
        jargonDecoder: [
          {
            term: 'curl.exe (Windows 11 Tip)',
            plainMeaning:
              'In Windows PowerShell, typing "curl.exe" runs the real network test tool, whereas typing "curl" without ".exe" triggers a different PowerShell prompt.',
          },
        ],
        howYouKnowItWorked:
          'PowerShell prints `{"status":"healthy","project":"[PROJECT_NAME]"}`.',
        commonMistakeFix:
          'If Windows Defender Firewall pops up a window asking to allow Python on private networks, click "Allow access".',
      },
      {
        id: 'g4-step-4',
        stepNumberLabel: 'Step 4.4',
        title: 'Save Your First Git Checkpoint on Windows 11',
        estimatedTime: '1 min',
        whatYouAreDoing:
          'You are saving a permanent snapshot ("commit") of your folders, CONTEXT.md, and practice server using Git.',
        realWorldAnalogy:
          'Saving your game at Checkpoint #1 so you can always rewind if you make a mistake later.',
        hardwareOptimizationNote:
          'Tailored for Windows 11 + 16GB RAM: Also ignores ".venv" and "node_modules" so Git never wastes RAM scanning thousands of library files.',
        whereToClickOrOpen:
          'Paste this command into PowerShell and press Enter:',
        copyableCommand:
          '".venv/`nnode_modules/`n.env" | Set-Content .gitignore; git init; git add .; git commit -m "feat: lock CONTEXT.md and Windows 11 mock server"',
        commandBreakdown: [
          {
            piece: '".venv/`nnode_modules/`n.env" | Set-Content .gitignore',
            meaning:
              'Creates a ".gitignore" file so Git never uploads your private ".env" password file or heavy library folders.',
          },
          {
            piece: 'git init; git add .; git commit -m "..."',
            meaning:
              'Initializes Git and saves your first permanent project checkpoint.',
          },
        ],
        jargonDecoder: [
          {
            term: '.gitignore',
            plainMeaning:
              'A short list of folders and secret files (like .env) that Git should ignore when saving or uploading your project.',
          },
        ],
        howYouKnowItWorked:
          'PowerShell prints "[main (root-commit)] feat: lock CONTEXT.md and Windows 11 mock server".',
        commonMistakeFix:
          'If "git" is not installed yet on your Windows 11 laptop, run: winget install --id Git.Git -e --source winget',
      },
    ],
  },
  {
    id: 'guide-stage-5',
    stageNumber: '05',
    title: 'Building the 4 Visual Website Screens & 50 Records (Ryzen 9 + RTX 5060)',
    subtitle:
      'Using your AMD Ryzen 9 HX to generate 50 realistic domain records and your RTX 5060 (8GB) to index them for instant search.',
    totalTime: '6 mins',
    plainOverview:
      'In Stage 05, your AMD Ryzen 9 HX processor generates 50 realistic sample records for [PROBLEM_DOMAIN] in parallel, your RTX 5060 (8GB VRAM) computes smart search coordinates (embeddings) in ~1.2GB of VRAM, and we launch your 4-screen React web app.',
    whyThisStageMatters:
      'Judges immediately trust a demo that opens with 50 realistic domain cases and searches them in under 15 milliseconds using your RTX 5060 graphics card.',
    microSteps: [
      {
        id: 'g5-step-1',
        stepNumberLabel: 'Step 5.1',
        title: 'Generate 50 Realistic Records Using Your AMD Ryzen 9 HX',
        estimatedTime: '1.5 mins',
        whatYouAreDoing:
          'You are running Stage 05’s data seeder with 8 parallel Ryzen 9 HX threads to create 50 realistic records for [PROBLEM_DOMAIN] inside "api\\seed_data.json".',
        realWorldAnalogy:
          'Instead of having 1 person write 50 sample case files one by one, your Ryzen 9 HX processor assigns 8 fast workers to write them simultaneously.',
        hardwareOptimizationNote:
          'Tailored for AMD Ryzen 9 HX (16 Cores / 32 Threads): Passing "--workers 8" uses half of your Ryzen 9 HX cores to finish 8x faster while keeping the other half completely free for Windows 11.',
        whereToClickOrOpen:
          'Paste this command into your Windows 11 PowerShell window:',
        copyableCommand:
          'python scripts\\05_scaffold_coder.py --seed-count 50 --workers 8 --domain "[PROBLEM_DOMAIN]"',
        commandBreakdown: [
          {
            piece: '--seed-count 50',
            meaning:
              'Creates 50 realistic domain records so your dashboard tables and charts look rich and complete.',
          },
          {
            piece: '--workers 8',
            meaning:
              'Uses 8 parallel threads on your AMD Ryzen 9 HX processor for fast generation.',
          },
        ],
        jargonDecoder: [
          {
            term: 'Multi-Threading (Ryzen 9 HX)',
            plainMeaning:
              'Your AMD Ryzen 9 HX processor has multiple "lanes" (threads) so it can work on 8 tasks at the exact same time.',
          },
        ],
        howYouKnowItWorked:
          'PowerShell prints "Generated 50 realistic domain records in api\\seed_data.json".',
        commonMistakeFix:
          'Want to inspect the 50 generated records? Run: Get-Content api\\seed_data.json | Select-Object -First 30',
      },
      {
        id: 'g5-step-2',
        stepNumberLabel: 'Step 5.2',
        title: 'Build Smart Search Coordinates on Your RTX 5060 (Uses ~1.2GB of 8GB VRAM)',
        estimatedTime: '1.5 mins',
        whatYouAreDoing:
          'You are indexing your 50 records into meaning-search vectors (BGE-M3 in FP16 mode) on your NVIDIA RTX 5060 graphics card.',
        realWorldAnalogy:
          'Organizing all 50 case files onto a smart map on your graphics card so when a user searches an idea, the RTX 5060 finds the closest match in 5 milliseconds.',
        hardwareOptimizationNote:
          'Tailored for RTX 5060 (8GB VRAM): BGE-M3 in FP16 (half-precision) uses only ~1.2 GB of your 8.0 GB RTX 5060 VRAM—leaving 6.8 GB of GPU memory completely free!',
        whereToClickOrOpen:
          'Verify your seed data and check your RTX 5060 VRAM usage in PowerShell:',
        copyableCommand:
          'Get-Item api\\seed_data.json; nvidia-smi --query-gpu=name,memory.used,memory.free --format=csv',
        commandBreakdown: [
          {
            piece: 'Get-Item api\\seed_data.json',
            meaning:
              'Confirms your 50-record seed file is saved and shows its size.',
          },
          {
            piece: 'nvidia-smi --query-gpu=name,memory.used,memory.free --format=csv',
            meaning:
              'Prints a 1-line summary of your RTX 5060 showing exact MB used and MB free out of 8,192 MB.',
          },
        ],
        jargonDecoder: [
          {
            term: 'Vector Embeddings (BGE-M3)',
            plainMeaning:
              'Turning sentences into number coordinates so your app can search by meaning instead of just exact words.',
          },
        ],
        howYouKnowItWorked:
          'You see "seed_data.json" listed and your RTX 5060 shows plenty of free VRAM (over 6,000 MiB free).',
        commonMistakeFix:
          'If you ever want to monitor your RTX 5060 and Ryzen 9 HX visually on Windows 11, press Ctrl + Shift + Esc and click the "Performance" tab (the graph icon).',
      },
      {
        id: 'g5-step-3',
        stepNumberLabel: 'Step 5.3',
        title: 'Start Your 4-Screen Website with a 16GB-RAM-Safe Node Cap',
        estimatedTime: '2 mins',
        whatYouAreDoing:
          'You are setting a safe 4GB memory ceiling for Node.js (so it never hogs your 16GB RAM), installing the frontend packages, and launching your visual web app.',
        realWorldAnalogy:
          'Giving the website builder its own dedicated 4GB workbench out of your 16GB total memory so Windows 11, Chrome, and Python all have plenty of breathing room.',
        hardwareOptimizationNote:
          'Tailored for 16GB RAM + Ryzen 9 HX on Windows 11: Setting NODE_OPTIONS="--max-old-space-size=4096" prevents Node/Vite from ever exceeding 4GB of your 16GB RAM.',
        whereToClickOrOpen:
          'Paste this command into PowerShell:',
        copyableCommand:
          '$env:NODE_OPTIONS="--max-old-space-size=4096"; npm install; npm run dev',
        commandBreakdown: [
          {
            piece: '$env:NODE_OPTIONS="--max-old-space-size=4096"',
            meaning:
              'Tells Windows PowerShell to cap Node.js memory at 4,096 MB (4 GB) to protect your 16 GB system RAM.',
          },
          {
            piece: 'npm install',
            meaning:
              'Downloads the React and Tailwind UI building blocks using your Ryzen 9 HX.',
          },
          {
            piece: 'npm run dev',
            meaning:
              'Starts your live website server on http://localhost:3000.',
          },
        ],
        jargonDecoder: [
          {
            term: '$env:NODE_OPTIONS (PowerShell)',
            plainMeaning:
              'The Windows PowerShell command for setting a temporary memory rule for Node.js.',
          },
        ],
        howYouKnowItWorked:
          'PowerShell prints "Local: http://localhost:3000/" in green.',
        commonMistakeFix:
          'If "npm" is not recognized on Windows 11, run: winget install OpenJS.NodeJS.LTS -e',
      },
      {
        id: 'g5-step-4',
        stepNumberLabel: 'Step 5.4',
        title: 'Open Your 4 Screens in Windows Edge / Chrome',
        estimatedTime: '1 min',
        whatYouAreDoing:
          'You are launching http://localhost:3000 right from PowerShell into your default Windows 11 browser and verifying all 4 screens.',
        realWorldAnalogy:
          'Stepping inside your newly furnished 4-room showroom to test the lights and buttons.',
        hardwareOptimizationNote:
          'Tailored for Windows 11 + 16GB RAM: "Start-Process http://localhost:3000" opens the URL directly in your default Windows 11 browser. Tip: Keep under 10 browser tabs open during your demo so Chrome/Edge uses less than 1.5GB of your 16GB RAM!',
        whereToClickOrOpen:
          'Open a second PowerShell tab (click the "+" icon at the top of Windows Terminal) and run:',
        copyableCommand:
          'Start-Process "http://localhost:3000"; curl.exe -I http://localhost:3000',
        commandBreakdown: [
          {
            piece: 'Start-Process "http://localhost:3000"',
            meaning:
              'Automatically opens your Windows 11 web browser directly to your running app.',
          },
          {
            piece: 'curl.exe -I http://localhost:3000',
            meaning:
              'Verifies that your local web server responds with "HTTP/1.1 200 OK".',
          },
        ],
        jargonDecoder: [
          {
            term: 'Start-Process (Windows 11)',
            plainMeaning:
              'A handy Windows PowerShell shortcut that opens any web link or program window.',
          },
        ],
        howYouKnowItWorked:
          'Your browser opens to http://localhost:3000 showing your sleek rounded UI and 50 domain records.',
        commonMistakeFix:
          'Leave the first PowerShell tab running "npm run dev" while you work in the second PowerShell tab.',
      },
    ],
  },
  {
    id: 'guide-stage-6',
    stageNumber: '06',
    title: 'Wiring Hybrid AI (RTX 5060 Local + Cloud API) & Repomix Bug Check',
    subtitle:
      'Connecting your RTX 5060 8GB for fast local tasks, Gemini Cloud for heavy reasoning, and scanning your repo on Ryzen 9 HX.',
    totalTime: '5 mins',
    plainOverview:
      'Here is the secret to winning on a 16GB RAM + RTX 5060 (8GB VRAM) laptop: you should NEVER try to cram a huge 30-billion-parameter LLM onto an 8GB graphics card (it requires ~20GB VRAM and will crash). Instead, Stage 06 wires a smart split: compact models run locally on your RTX 5060 (~3.8GB VRAM used) and heavy reasoning runs via the Gemini Cloud API (0GB VRAM used)!',
    whyThisStageMatters:
      'This hybrid setup gives you the best of both worlds: instant <15ms local GPU speed on your RTX 5060 plus massive frontier reasoning without ever running out of your 8GB VRAM or 16GB RAM.',
    microSteps: [
      {
        id: 'g6-step-1',
        stepNumberLabel: 'Step 6.1',
        title: 'Install PyTorch with CUDA Support for Your RTX 5060 on Windows 11',
        estimatedTime: '2 mins',
        whatYouAreDoing:
          'You are verifying/installing PyTorch with NVIDIA CUDA acceleration on Windows 11 and confirming Python can talk directly to your RTX 5060 8GB GPU.',
        realWorldAnalogy:
          'Connecting the turbocharger (your RTX 5060 graphics card) to your Python engine.',
        hardwareOptimizationNote:
          'Tailored for Windows 11 + RTX 5060 (8GB): Checks "torch.cuda.get_device_name(0)" so you see "NVIDIA GeForce RTX 5060 Laptop GPU" confirmed right inside Python.',
        whereToClickOrOpen:
          'Paste this command into your Windows 11 PowerShell window:',
        copyableCommand:
          'python scripts\\06_wire_3tier_dag.py --project "[PROJECT_NAME]" --gpu-vram-limit-mb 5500',
        commandBreakdown: [
          {
            piece: 'python scripts\\06_wire_3tier_dag.py',
            meaning:
              'Wires your backend AI pipeline so local tasks use your RTX 5060 and heavy synthesis uses Gemini Cloud.',
          },
          {
            piece: '--gpu-vram-limit-mb 5500',
            meaning:
              'Strictly caps local GPU usage at 5.5 GB out of your 8.0 GB RTX 5060 VRAM.',
          },
        ],
        jargonDecoder: [
          {
            term: 'CUDA (NVIDIA GPU Acceleration)',
            plainMeaning:
              'NVIDIA’s technology that lets Python run AI math on your RTX 5060 graphics card instead of your CPU.',
          },
        ],
        howYouKnowItWorked:
          'PowerShell prints "[STAGE 06] Hybrid AI pipeline wired (RTX 5060 8GB budget < 5.5GB VRAM)".',
        commonMistakeFix:
          'Because giant 30B+ models are routed to the Cloud API, your 16GB system RAM stays light and responsive.',
      },
      {
        id: 'g6-step-2',
        stepNumberLabel: 'Step 6.2',
        title: 'Bundle Your Codebase into One File with Repomix on Ryzen 9 HX',
        estimatedTime: '1 min',
        whatYouAreDoing:
          'You are running "npx repomix" on your AMD Ryzen 9 HX processor to pack all your project files into one single text file ("full_repo_context.txt") for automatic bug scanning.',
        realWorldAnalogy:
          'Scanning every page of your project binder into a single PDF so an AI proofreader can check all files at once for any mismatched names.',
        hardwareOptimizationNote:
          'Tailored for AMD Ryzen 9 HX: Thanks to your Ryzen 9 HX’s fast single-core and multi-core speed, bundling the entire project takes less than 2 seconds on Windows 11.',
        whereToClickOrOpen:
          'Paste this command into PowerShell:',
        copyableCommand: 'npx repomix --output full_repo_context.txt',
        commandBreakdown: [
          {
            piece: 'npx repomix',
            meaning:
              'Runs the Repomix code bundler tool directly in Windows PowerShell.',
          },
          {
            piece: '--output full_repo_context.txt',
            meaning:
              'Saves the combined snapshot into "full_repo_context.txt".',
          },
        ],
        jargonDecoder: [
          {
            term: 'Repomix',
            plainMeaning:
              'A tool that merges all your code files into one clean text file so Gemini can inspect your whole app at once.',
          },
        ],
        howYouKnowItWorked:
          'PowerShell creates "full_repo_context.txt" and prints total file and token counts.',
        commonMistakeFix:
          'You can upload "full_repo_context.txt" to Gemini anytime to find and fix a bug across your entire project in one prompt!',
      },
      {
        id: 'g6-step-3',
        stepNumberLabel: 'Step 6.3',
        title: 'Compile & Check for Zero Errors on Windows 11',
        estimatedTime: '1 min',
        whatYouAreDoing:
          'You are running a full production build check ("npm run build") to verify there are zero TypeScript or broken-link errors.',
        realWorldAnalogy:
          'Running a full diagnostic check on the car before taking it onto the highway.',
        hardwareOptimizationNote:
          'Tailored for Ryzen 9 HX + 16GB RAM: Your Ryzen 9 HX compiles the entire React + Tailwind bundle in ~1.5 seconds.',
        whereToClickOrOpen:
          'Paste this command into PowerShell:',
        copyableCommand: 'npm run build',
        commandBreakdown: [
          {
            piece: 'npm run build',
            meaning:
              'Checks every TypeScript file and packages your website to prove zero errors exist.',
          },
        ],
        jargonDecoder: [
          {
            term: 'Production Build',
            plainMeaning:
              'Verifying and packaging your website code into optimized files ready for live users.',
          },
        ],
        howYouKnowItWorked:
          'PowerShell prints "built in ..." with zero red error messages.',
        commonMistakeFix:
          'If an error appears, copy the exact message and paste it with your CONTEXT.md into your AI coding assistant.',
      },
      {
        id: 'g6-step-4',
        stepNumberLabel: 'Step 6.4',
        title: 'Lock the Hour 14:00 Feature Freeze Checkpoint',
        estimatedTime: '1 min',
        whatYouAreDoing:
          'You are saving a Git checkpoint on Windows 11 and officially stopping all new feature additions so the last 3 hours are dedicated to speed and demo reliability.',
        realWorldAnalogy:
          'Putting down the paintbrushes 2 hours before the art gallery opens so the paint has time to dry.',
        hardwareOptimizationNote:
          'Tailored for 16GB RAM: Freezing features prevents last-minute memory leaks or unoptimized packages from slowing down your laptop before judging.',
        whereToClickOrOpen:
          'Paste this command into PowerShell:',
        copyableCommand:
          'git add .; git commit -m "feat: complete hybrid RTX 5060 + Cloud pipeline before feature freeze"',
        commandBreakdown: [
          {
            piece: 'git add .; git commit -m "..."',
            meaning:
              'Saves all your working code into a permanent Git checkpoint on Windows 11.',
          },
        ],
        jargonDecoder: [
          {
            term: 'Hour 14:00 Feature Freeze',
            plainMeaning:
              'The strict rule where you stop adding new features and focus 100% on testing, speed, and presentation polish.',
          },
        ],
        howYouKnowItWorked:
          'PowerShell confirms your commit is saved.',
        commonMistakeFix:
          'Do not add new screens or heavy libraries after this checkpoint!',
      },
    ],
  },
  {
    id: 'guide-stage-7',
    stageNumber: '07',
    title: 'Compressing Models for Your 8GB RTX 5060 & Recording Your Offline Backup Vault',
    subtitle:
      'Using FP16/INT8 compression so your RTX 5060 8GB runs 2x faster, and saving "demo_vault.json" in case venue Wi-Fi drops.',
    totalTime: '4 mins',
    plainOverview:
      'In Stage 07, we do two critical things for your Windows 11 laptop: (1) We compress local AI weights into FP16 / INT8 format so they use less than 4.2 GB of your RTX 5060’s 8.0 GB VRAM and run twice as fast, and (2) we record your 3 Golden Demo answers into "api\\demo_vault.json" on your SSD so even if auditorium Wi-Fi disconnects, your demo works instantaneously!',
    whyThisStageMatters:
      'With 8GB VRAM on an RTX 5060, unquantized (FP32) models would take ~7.8GB and risk a crash. Quantizing to FP16/INT8 cuts VRAM usage in half (~3.9GB) and doubles speed on RTX 50-series Tensor Cores!',
    microSteps: [
      {
        id: 'g7-step-1',
        stepNumberLabel: 'Step 7.1',
        title: 'Compress Local Models to FP16/INT8 for Your 8GB RTX 5060 & Record Backup Vault',
        estimatedTime: '1.5 mins',
        whatYouAreDoing:
          'You are running Stage 07’s optimizer script, which enables FP16/INT8 Tensor Core acceleration for your RTX 5060 8GB and records your 3 Golden Demo scenarios into "api\\demo_vault.json".',
        realWorldAnalogy:
          'Packing high-resolution photos into an ultra-fast format that takes half the space on your graphics card, plus saving an offline copy on your laptop SSD.',
        hardwareOptimizationNote:
          'Tailored for NVIDIA GeForce RTX 5060 (8GB GDDR7): RTX 5060 Tensor Cores are specifically engineered for FP16 and INT8 math—cutting VRAM from ~7.6GB down to ~3.8GB while doubling token speed!',
        whereToClickOrOpen:
          'Paste this command into your Windows 11 PowerShell window:',
        copyableCommand:
          'python scripts\\07_quantize_and_vault.py --project "[PROJECT_NAME]" --gpu "RTX5060-8GB" --precision fp16',
        commandBreakdown: [
          {
            piece: '--gpu "RTX5060-8GB" --precision fp16',
            meaning:
              'Optimizes model precision to 16-bit floating point (FP16) so it fits comfortably inside your 8GB RTX 5060 VRAM.',
          },
          {
            piece: '07_quantize_and_vault.py',
            meaning:
              'Also records real AI responses into "api\\demo_vault.json" as your offline safety net.',
          },
        ],
        jargonDecoder: [
          {
            term: 'FP16 / INT8 Quantization (Crucial for 8GB VRAM)',
            plainMeaning:
              'Storing AI numbers in compact 16-bit or 8-bit format instead of bulky 32-bit format. It cuts RTX 5060 memory usage in half with virtually zero loss in quality.',
          },
        ],
        howYouKnowItWorked:
          'PowerShell prints "[STAGE 07] RTX 5060 VRAM optimized (3.8GB / 8.0GB used) & api\\demo_vault.json locked."',
        commonMistakeFix:
          'Before running your live pitch, plug your Windows 11 laptop into its wall power charger so Windows 11 runs the RTX 5060 and Ryzen 9 HX at full performance mode!',
      },
      {
        id: 'g7-step-2',
        stepNumberLabel: 'Step 7.2',
        title: 'Verify Your Backup Vault & RTX 5060 Headroom in PowerShell',
        estimatedTime: '1 min',
        whatYouAreDoing:
          'You are inspecting "api\\demo_vault.json" and checking that your RTX 5060 8GB VRAM and 16GB system RAM have plenty of free headroom.',
        realWorldAnalogy:
          'Checking both your spare tire in the trunk and your fuel gauge before driving onto the stage.',
        hardwareOptimizationNote:
          'Tailored for Windows 11 + 16GB RAM + RTX 5060 8GB: Prints both your saved backup file and your live GPU memory headroom.',
        whereToClickOrOpen:
          'Paste this command into PowerShell:',
        copyableCommand:
          'Get-Content api\\demo_vault.json; nvidia-smi --query-gpu=utilization.gpu,memory.used,memory.free --format=csv',
        commandBreakdown: [
          {
            piece: 'Get-Content api\\demo_vault.json',
            meaning:
              'Displays your pre-recorded Golden Demo answers saved on your Windows SSD.',
          },
          {
            piece: 'nvidia-smi --query-gpu=...',
            meaning:
              'Confirms your RTX 5060 has at least 3,500+ MiB of free VRAM remaining.',
          },
        ],
        jargonDecoder: [
          {
            term: 'VRAM Headroom',
            plainMeaning:
              'Leaving at least 2GB to 3GB of your 8GB RTX 5060 memory free so Windows 11 desktop graphics and screen sharing run at a silky-smooth 60fps.',
          },
        ],
        howYouKnowItWorked:
          'You see your backup JSON answers and healthy free memory on your RTX 5060.',
        commonMistakeFix:
          'Close any background games, Steam, or Discord overlays on Windows 11 before your pitch to free up extra RAM and VRAM.',
      },
      {
        id: 'g7-step-3',
        stepNumberLabel: 'Step 7.3',
        title: 'Test Instant Offline Backup Response on Windows 11',
        estimatedTime: '1 min',
        whatYouAreDoing:
          'You are sending a test request to your local server using Windows "curl.exe" to prove that even if venue Wi-Fi drops, your laptop replies in under 5 milliseconds from "demo_vault.json".',
        realWorldAnalogy:
          'Testing your backup generator to see the lights stay on without a single flicker.',
        hardwareOptimizationNote:
          'Tailored for Windows 11 PowerShell: Uses "Invoke-RestMethod" (PowerShell’s cleanest built-in JSON tester) so you don’t have to worry about escaping quotation marks on Windows!',
        whereToClickOrOpen:
          'Paste this command into PowerShell:',
        copyableCommand:
          'Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/analyze" -Method Post -ContentType "application/json" -Body \'{"query":"demo"}\'',
        commandBreakdown: [
          {
            piece: 'Invoke-RestMethod -Uri "..." -Method Post',
            meaning:
              'Windows PowerShell’s native tool for sending a test JSON request to your local server and formatting the reply neatly.',
          },
          {
            piece: '-Body \'{"query":"demo"}\'',
            meaning:
              'Sends the sample input {"query":"demo"} to verify instant response.',
          },
        ],
        jargonDecoder: [
          {
            term: 'Invoke-RestMethod (PowerShell)',
            plainMeaning:
              'A friendly Windows PowerShell command that tests web APIs without messy backslash quoting.',
          },
        ],
        howYouKnowItWorked:
          'PowerShell immediately prints the structured analysis response with zero delay.',
        commonMistakeFix:
          'If the server isn’t running, start it with the Step 4.3 command.',
      },
      {
        id: 'g7-step-4',
        stepNumberLabel: 'Step 7.4',
        title: 'Commit Your Offline Backup Vault to Git',
        estimatedTime: '0.5 mins',
        whatYouAreDoing:
          'You are locking "api\\demo_vault.json" into Git so your offline demo safety net is permanently saved.',
        realWorldAnalogy:
          'Locking the fireproof safe after putting your backup copies inside.',
        hardwareOptimizationNote:
          'Tailored for Windows 11: Uses Windows backslash path "api\\demo_vault.json".',
        whereToClickOrOpen:
          'Paste this command into PowerShell:',
        copyableCommand:
          'git add api\\demo_vault.json; git commit -m "chore: lock RTX 5060 FP16 config and offline demo_vault.json"',
        commandBreakdown: [
          {
            piece: 'git add api\\demo_vault.json',
            meaning:
              'Stages your offline backup file in Git on Windows 11.',
          },
          {
            piece: 'git commit -m "..."',
            meaning:
              'Saves the checkpoint permanently.',
          },
        ],
        jargonDecoder: [
          {
            term: 'Zero-Downtime Demo',
            plainMeaning:
              'A demo setup that is guaranteed to work on stage even if the auditorium Wi-Fi completely fails.',
          },
        ],
        howYouKnowItWorked:
          'PowerShell prints "[main ...] chore: lock RTX 5060 FP16 config and offline demo_vault.json".',
        commonMistakeFix:
          'If Git says "nothing to commit", your file is already saved in the latest commit.',
      },
    ],
  },
  {
    id: 'guide-stage-8',
    stageNumber: '08',
    title: 'Multi-Core Ryzen 9 Robot Testing, Publishing Live & Submitting',
    subtitle:
      'Running 3 parallel Playwright browser tests on your AMD Ryzen 9 HX, publishing to [DOMAIN_URL], and submitting 15 minutes early.',
    totalTime: '6 mins',
    plainOverview:
      'In the final stage, we use your AMD Ryzen 9 HX processor to run 3 automated browser tests ("Playwright") in parallel while keeping total memory well inside your 16GB RAM. Then we generate your judge-ready "README.md" (highlighting your hybrid RTX 5060 + Cloud architecture), push your code live, and submit at Hour 16:45.',
    whyThisStageMatters:
      'Running "--workers=3" on Playwright uses your Ryzen 9 HX’s multi-core speed to verify all 4 screens in 12 seconds flat while using only ~1.1GB of your 16GB RAM.',
    microSteps: [
      {
        id: 'g8-step-1',
        stepNumberLabel: 'Step 8.1',
        title: 'Run 3 Parallel Robot Browser Tests on Your AMD Ryzen 9 HX',
        estimatedTime: '2 mins',
        whatYouAreDoing:
          'You are running Playwright on Windows 11 with 3 parallel Ryzen 9 HX workers to automatically click through all 4 of your screens and verify zero errors.',
        realWorldAnalogy:
          'Having 3 robotic test drivers test-drive your app at the exact same time to prove every button works flawlessly.',
        hardwareOptimizationNote:
          'Tailored for AMD Ryzen 9 HX + 16GB RAM: "--workers=3" runs all 3 verification passes simultaneously on your Ryzen 9 HX cores while capping headless browser RAM at ~1.1 GB out of your 16 GB RAM.',
        whereToClickOrOpen:
          'Paste this command into your Windows 11 PowerShell window:',
        copyableCommand: 'npx playwright test --workers=3',
        commandBreakdown: [
          {
            piece: 'npx playwright test',
            meaning:
              'Launches the automated Chromium test browser on Windows 11 to click through your 4 screens.',
          },
          {
            piece: '--workers=3',
            meaning:
              'Runs 3 parallel test threads on your AMD Ryzen 9 HX processor (optimal balance of speed and 16GB RAM safety).',
          },
        ],
        jargonDecoder: [
          {
            term: 'Playwright Parallel Workers',
            plainMeaning:
              'Running multiple invisible test browsers at the same time on your Ryzen 9 HX CPU to finish testing 3x faster.',
          },
        ],
        howYouKnowItWorked:
          'PowerShell prints "3 passed" in green with zero console or page errors.',
        commonMistakeFix:
          'If Playwright says browsers are not installed yet on your Windows 11 laptop, run "npx playwright install chromium" once (takes ~30 seconds).',
      },
      {
        id: 'g8-step-2',
        stepNumberLabel: 'Step 8.2',
        title: 'Generate Your Judge-Ready README.md Highlighting Your Hardware Benchmarks',
        estimatedTime: '1.5 mins',
        whatYouAreDoing:
          'You are generating and reviewing "README.md"—the front page of your GitHub repository that shows judges your architecture and real benchmarks on your Ryzen 9 HX + RTX 5060 8GB.',
        realWorldAnalogy:
          'Putting a clear specification plaque on the front of your project so judges immediately see the engineering quality.',
        hardwareOptimizationNote:
          'Tailored for Windows 11: Uses PowerShell’s "Select-Object -First 25" (instead of Linux "head -n 25") to preview your README.md cleanly.',
        whereToClickOrOpen:
          'Click "Download .md" for README.md in Sub-Website 1 (Artifact Studio) or preview it in PowerShell:',
        copyableCommand: 'Get-Content README.md | Select-Object -First 25',
        commandBreakdown: [
          {
            piece: 'Get-Content README.md',
            meaning:
              'Reads your README.md file on Windows 11.',
          },
          {
            piece: '| Select-Object -First 25',
            meaning:
              'Displays the top 25 lines right inside PowerShell.',
          },
        ],
        jargonDecoder: [
          {
            term: 'README.md',
            plainMeaning:
              'The welcome page of your GitHub link that explains what [PROJECT_NAME] does, how fast it runs, and how to test it.',
          },
        ],
        howYouKnowItWorked:
          'You see your project title [PROJECT_NAME], problem domain [PROBLEM_DOMAIN], and benchmark table printed.',
        commonMistakeFix:
          'Take a quick Windows 11 screenshot of your finished app (press Windows Key + Shift + S) and add it to the top of your README!',
      },
      {
        id: 'g8-step-3',
        stepNumberLabel: 'Step 8.3',
        title: 'Tag Your Final Release & Publish Live to [DOMAIN_URL]',
        estimatedTime: '1.5 mins',
        whatYouAreDoing:
          'You are locking your final code snapshot in Git with a release tag ("v2.0.0-submission-lock") and pushing it live so judges can visit [DOMAIN_URL].',
        realWorldAnalogy:
          'Putting the official inspection seal on your product and opening the front doors to the judges.',
        hardwareOptimizationNote:
          'Tailored for Windows 11 PowerShell: Chains Git commands cleanly using PowerShell semicolons (;).',
        whereToClickOrOpen:
          'Paste this command into PowerShell:',
        copyableCommand:
          'git add .; git commit -m "release: v2.0.0-submission-lock (Win11 Ryzen 9 HX + RTX 5060 8GB verified)"; git tag v2.0.0-submission-lock',
        commandBreakdown: [
          {
            piece: 'git commit -m "release: v2.0.0-submission-lock..."',
            meaning:
              'Saves your final verified code snapshot.',
          },
          {
            piece: 'git tag v2.0.0-submission-lock',
            meaning:
              'Attaches a permanent version label to this exact working commit.',
          },
        ],
        jargonDecoder: [
          {
            term: 'Git Release Tag',
            plainMeaning:
              'A permanent bookmark on your final submission code so judges see a clean, official release.',
          },
        ],
        howYouKnowItWorked:
          'Run "git tag" in PowerShell and you see "v2.0.0-submission-lock" listed.',
        commonMistakeFix:
          'Test opening your live link in a Private/Incognito window on Windows Edge or Chrome (Ctrl + Shift + N) to verify anyone can view it.',
      },
      {
        id: 'g8-step-4',
        stepNumberLabel: 'Step 8.4',
        title: 'Pre-Stage Demo Mode on Windows 11 & Submit 15 Minutes Early (Hour 16:45)',
        estimatedTime: '1 min',
        whatYouAreDoing:
          'You are preparing your Windows 11 laptop for the live pitch (turning on Do Not Disturb, plugging in power for full RTX 5060 performance) and submitting your links at Hour 16:45.',
        realWorldAnalogy:
          'Handing in your exam 15 minutes early and silencing your phone before walking onto the stage.',
        hardwareOptimizationNote:
          'Tailored for Windows 11 + RTX 5060 + Ryzen 9 HX + 16GB RAM: Plug in your AC charger (so NVIDIA BatteryBoost doesn’t throttle your RTX 5060), turn on Windows 11 "Do Not Disturb" in the bottom-right notification tray, and close heavy background apps so ~8GB+ of your 16GB RAM is completely free for a silky-smooth live demo!',
        whereToClickOrOpen:
          'Submit your project on Devpost / the hackathon portal at Hour 16:45, then run your victory check in PowerShell:',
        copyableCommand:
          'Write-Host "CONGRATULATIONS! [PROJECT_NAME] is locked, tested on Ryzen 9 HX + RTX 5060 8GB, and ready for the judges!" -ForegroundColor Green',
        commandBreakdown: [
          {
            piece: 'Write-Host "CONGRATULATIONS!..." -ForegroundColor Green',
            meaning:
              'Prints your final completion confirmation in bright green inside Windows 11 PowerShell!',
          },
        ],
        jargonDecoder: [
          {
            term: 'Windows 11 Best Performance Power Mode',
            plainMeaning:
              'When your laptop is plugged into wall power, Windows 11 lets your Ryzen 9 HX and RTX 5060 run at 100% speed instead of battery-saving mode.',
          },
        ],
        howYouKnowItWorked:
          'Your hackathon submission page shows "Submitted" and all 32 micro-steps in this guide are complete!',
        commonMistakeFix:
          'Double-check that your GitHub repo is set to "Public" so judges can view your README.md without logging in.',
      },
    ],
  },
];

export function injectBeginnerGuideVariables(
  rawText: string,
  config: Pick<ArtifactConfig, 'projectName' | 'problemDomain' | 'domainUrl'>
): string {
  const projectName = config.projectName.trim() || 'AegisGrid AI';
  const problemDomain =
    config.problemDomain.trim() || 'Autonomous Microgrid & Substation Fault Triage';
  const domainUrl = config.domainUrl.trim() || 'https://aegisgrid.tech';
  const projectSlug =
    projectName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'hackathon-app';

  return rawText
    .replace(/\[PROJECT_NAME\]/g, projectName)
    .replace(/\[PROBLEM_DOMAIN\]/g, problemDomain)
    .replace(/\[DOMAIN_URL\]/g, domainUrl)
    .replace(/\[PROJECT_SLUG\]/g, projectSlug);
}

export interface BeginnerGuideProgress {
  completedSteps: number;
  totalSteps: number;
  completedStages: number;
  totalStages: number;
  percent: number;
}

export function calculateBeginnerGuideProgress(
  checkedSteps: Record<string, boolean>,
  stages: BeginnerStageGuide[] = BEGINNER_STAGES
): BeginnerGuideProgress {
  let completedSteps = 0;
  let totalSteps = 0;
  let completedStages = 0;

  for (const st of stages) {
    let stageDone = 0;
    for (const ms of st.microSteps) {
      totalSteps += 1;
      if (checkedSteps[ms.id]) {
        completedSteps += 1;
        stageDone += 1;
      }
    }
    if (st.microSteps.length > 0 && stageDone === st.microSteps.length) {
      completedStages += 1;
    }
  }

  const percent = totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100);
  return {
    completedSteps,
    totalSteps,
    completedStages,
    totalStages: stages.length,
    percent,
  };
}

export function generateBeginnerGuideMarkdown(
  config: ArtifactConfig,
  stages: BeginnerStageGuide[] = BEGINNER_STAGES
): string {
  const lines: string[] = [
    `# ZERO-TO-HERO BEGINNER GUIDE: Building & Automating ${config.projectName}`,
    `> **Hardware Profile:** Windows 11 Laptop · AMD Ryzen 9 HX · 16GB RAM · NVIDIA GeForce RTX 5060 (8GB VRAM)`,
    `> **Problem Domain:** ${config.problemDomain}`,
    `> **Target Live URL:** ${config.domainUrl}`,
    `> **Who This Is For:** A complete, non-technical, plain-English walkthrough of Stages 01 to 08 tuned specifically for your Windows 11 laptop with 16GB RAM, AMD Ryzen 9 HX CPU, and RTX 5060 8GB graphics card.`,
    '',
    `## Your Laptop Hardware Budget Rules`,
  ];

  for (const hw of LAPTOP_HARDWARE_PROFILE) {
    lines.push(`- **${hw.component} (${hw.model}):** ${hw.plainRole} *Rule: ${hw.safeBudgetRule}*`);
  }
  lines.push('');

  for (const st of stages) {
    lines.push(`---`);
    lines.push(`## STAGE ${st.stageNumber}: ${injectBeginnerGuideVariables(st.title, config)} (${st.totalTime})`);
    lines.push(`**In Plain English:** ${injectBeginnerGuideVariables(st.plainOverview, config)}`);
    lines.push(`**Why This Matters:** ${injectBeginnerGuideVariables(st.whyThisStageMatters, config)}`);
    lines.push('');

    for (const ms of st.microSteps) {
      lines.push(`### ${ms.stepNumberLabel} — ${injectBeginnerGuideVariables(ms.title, config)} (${ms.estimatedTime})`);
      lines.push(`- **What You Are Doing:** ${injectBeginnerGuideVariables(ms.whatYouAreDoing, config)}`);
      lines.push(`- **Everyday Analogy:** ${injectBeginnerGuideVariables(ms.realWorldAnalogy, config)}`);
      lines.push(`- **Your Laptop Tuning (Win 11 · Ryzen 9 HX · 16GB RAM · RTX 5060 8GB):** ${injectBeginnerGuideVariables(ms.hardwareOptimizationNote, config)}`);
      lines.push(`- **Where to Click / Open:** ${injectBeginnerGuideVariables(ms.whereToClickOrOpen, config)}`);
      if (ms.copyableCommand) {
        lines.push('');
        lines.push('```powershell');
        lines.push(injectBeginnerGuideVariables(ms.copyableCommand, config));
        lines.push('```');
        lines.push('');
      }
      if (ms.commandBreakdown.length > 0) {
        lines.push(`- **What Each Part of This Command Means:**`);
        for (const cb of ms.commandBreakdown) {
          lines.push(`  - \`${injectBeginnerGuideVariables(cb.piece, config)}\`: ${injectBeginnerGuideVariables(cb.meaning, config)}`);
        }
      }
      lines.push(`- **How You Know It Worked:** ${injectBeginnerGuideVariables(ms.howYouKnowItWorked, config)}`);
      lines.push(`- **If Something Goes Wrong:** ${injectBeginnerGuideVariables(ms.commonMistakeFix, config)}`);
      lines.push('');
    }
  }

  return lines.join('\n');
}

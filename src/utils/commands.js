export const createCommandSystem = (addLine, setShowMonitor, startMatrix) => {
    const commands = {
      help: () => {
        return `
  ╔═══════════════════════════════════════════════════════════════╗
  ║                    AVAILABLE COMMANDS                         ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║  help            - Display this help message                  ║
  ║  clear           - Clear the terminal screen                  ║
  ║  status          - Show system status                         ║
  ║  monitor         - Toggle system monitor                      ║
  ║  matrix          - Enter the matrix (easter egg)              ║
  ║  whoami          - Display current user                       ║
  ║  date            - Show current date and time                 ║
  ║  uptime          - Show system uptime                         ║
  ║  neofetch        - Display system information                 ║
  ║  ls              - List directory contents                    ║
  ║  pwd             - Print working directory                    ║
  ║  echo [text]     - Print text to terminal                     ║
  ║  history         - Show command history                       ║
  ║  hack [target]   - Initiate hacking sequence (sim)            ║
  ║  exit            - Close terminal (simulation)                ║
  ║                                                               ║
  ╚═══════════════════════════════════════════════════════════════╝
  `;
      },
  
      clear: () => {
        // This will be handled specially in the Terminal component
        return 'CLEAR_SCREEN';
      },
  
      status: () => {
        const uptime = Math.floor(Math.random() * 100000);
        const users = Math.floor(Math.random() * 50) + 1;
        const load = (Math.random() * 3).toFixed(2);
        
        return `
  System Status Report:
  ────────────────────────────────────────────────
    Status: OPERATIONAL
    Load Average: ${load}, ${(Math.random() * 3).toFixed(2)}, ${(Math.random() * 3).toFixed(2)}
    Users: ${users}
    Uptime: ${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m
    Processes: ${Math.floor(Math.random() * 200) + 50}
    CPU Temp: ${(Math.random() * 30 + 40).toFixed(1)}°C
  ────────────────────────────────────────────────
  `;
      },
  
      monitor: () => {
        setShowMonitor(prev => !prev);
        return 'Toggling system monitor...';
      },
  
      matrix: () => {
        startMatrix();
        return 'Wake up, Neo...';
      },
  
      whoami: () => {
        return 'root';
      },
  
      date: () => {
        return new Date().toString();
      },
  
      uptime: () => {
        const uptime = Math.floor(Math.random() * 100000);
        const days = Math.floor(uptime / 86400);
        const hours = Math.floor((uptime % 86400) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        
        return `up ${days} days, ${hours} hours, ${minutes} minutes`;
      },
  
      neofetch: () => {
        return `
          ██████╗██╗   ██╗██████╗ ███████╗██████╗ 
         ██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗
         ██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝
         ██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗
         ╚██████╗   ██║   ██████╔╝███████╗██║  ██║
          ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝
  
         OS: CYBER OS v2.077.1984
         Kernel: 6.66.0-quantum
         Shell: cyber-shell
         Resolution: 1920x1080
         CPU: Intel Core i9-13900K @ 5.8GHz
         GPU: NVIDIA RTX 4090 Neural Edition
         Memory: 256GB DDR7-9600
  `;
      },
  
      ls: () => {
        const files = [
          'neural_link/',
          'quantum_processor/',
          'cyber_defense/',
          'documents/',
          'downloads/',
          'config.sys',
          'autoexec.bat',
          'README.md',
          'secret_plans.encrypted'
        ];
        
        return files.join('    ');
      },
  
      pwd: () => {
        return '/home/root/cyberpunk';
      },
  
      echo: (args) => {
        return args.join(' ') || '';
      },
  
      history: () => {
        // This will be populated with actual history
        return 'Command history feature - check your terminal history with ↑ arrow';
      },
  
      hack: (args) => {
        const target = args[0] || 'localhost';
        
        return `
  ╔════════════════════════════════════════════════════════════╗
  ║            INITIATING HACK SEQUENCE                        ║
  ╚════════════════════════════════════════════════════════════╝
  
  Target: ${target}
  Status: Scanning ports...
  
  [████████████████████████████████████████████] 100%
  
  Open Ports Found:
    Port 22  - SSH        [VULNERABLE]
    Port 80  - HTTP       [PROTECTED]
    Port 443 - HTTPS      [PROTECTED]
    Port 3389 - RDP       [VULNERABLE]
  
  Exploiting vulnerabilities...
    ▶ Attempting SQL injection................ [FAILED]
    ▶ Trying buffer overflow.................. [FAILED]
    ▶ Deploying zero-day exploit.............. [SUCCESS]
  
  Access Granted: Root Level
  Downloading classified files...
  
  [████████████████████████████████████████████] 100%
  
  HACK COMPLETE
  Files downloaded to: /tmp/hacked_data/
  
  NOTE: This is a simulation. No actual hacking occurred.
  `;
      },
  
      exit: () => {
        return `
  ╔════════════════════════════════════════════════════════════╗
  ║  Closing terminal session...                               ║
  ║  All neural connections terminated.                        ║
  ║  Goodbye, cyber warrior.                                   ║
  ╚════════════════════════════════════════════════════════════╝
  
  (Terminal will remain open - this is just a simulation)
  `;
      },
  
      // Easter eggs
      cowsay: (args) => {
        const message = args.join(' ') || 'Moo!';
        return `
   ${'_'.repeat(message.length + 2)}
  < ${message} >
   ${'-'.repeat(message.length + 2)}
          \\   ^__^
           \\  (oo)\\_______
              (__)\\       )\\/\\
                  ||----w |
                  ||     ||
  `;
      },
  
      fortune: () => {
        const fortunes = [
          'In the future, everyone will be a hacker for 15 minutes.',
          'The best way to predict the future is to code it.',
          'There is no spoon... only pointers.',
          'With great power comes great memory leaks.',
          'A bug in production is worth two in development.',
          'Keep calm and clear your cache.',
          'May your queries be optimized and your latency low.',
        ];
        
        return fortunes[Math.floor(Math.random() * fortunes.length)];
      },
  
      ascii: () => {
        return `
     ▄████████ ▄██   ▄   ▀█████████▄     ▄████████    ▄████████ 
    ███    ███ ███   ██▄   ███    ███   ███    ███   ███    ███ 
    ███    █▀  ███▄▄▄███   ███    ███   ███    █▀    ███    ███ 
    ███        ▀▀▀▀▀▀███  ▄███▄▄▄██▀   ▄███▄▄▄      ▄███▄▄▄▄██▀ 
    ███        ▄██   ███ ▀▀███▀▀▀██▄  ▀▀███▀▀▀     ▀▀███▀▀▀▀▀   
    ███    █▄  ███   ███   ███    ██▄   ███    █▄  ▀███████████ 
    ███    ███ ███   ███   ███    ███   ███    ███   ███    ███ 
    ████████▀   ▀█████▀  ▄█████████▀    ██████████   ███    ███ 
                                                      ███    ███ 
  `;
      },
    };
  
    return (input) => {
      const parts = input.trim().split(' ');
      const command = parts[0].toLowerCase();
      const args = parts.slice(1);
  
      if (commands[command]) {
        return commands[command](args);
      } else {
        return `Command not found: ${command}. Type 'help' for available commands.`;
      }
    };
  };
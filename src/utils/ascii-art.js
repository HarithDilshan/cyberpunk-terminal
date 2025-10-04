export const asciiLogo = `
   ▄████▄▓██   ██▓ ▄▄▄▄   ▓█████  ██▀███  
  ▒██▀ ▀█ ▒██  ██▒▓█████▄ ▓█   ▀ ▓██ ▒ ██▒
  ▒▓█    ▄ ▒██ ██░▒██▒ ▄██▒███   ▓██ ░▄█ ▒
  ▒▓▓▄ ▄██▒░ ▐██▓░▒██░█▀  ▒▓█  ▄ ▒██▀▀█▄  
  ▒ ▓███▀ ░░ ██▒▓░░▓█  ▀█▓░▒████▒░██▓ ▒██▒
  ░ ░▒ ▒  ░ ██▒▒▒ ░▒▓███▀▒░░ ▒░ ░░ ▒▓ ░▒▓░
`;

export const welcomeBanner = `
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   ██████╗██╗   ██╗██████╗ ███████╗██████╗                   ║
║  ██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗                  ║
║  ██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝                  ║
║  ██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗                  ║
║  ╚██████╗   ██║   ██████╔╝███████╗██║  ██║                  ║
║   ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝                  ║
║                                                              ║
║              TERMINAL DASHBOARD v2.077                       ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`;

export const generateBarChart = (data, maxWidth = 50) => {
  const max = Math.max(...data);
  return data.map(value => {
    const width = Math.floor((value / max) * maxWidth);
    return '█'.repeat(width);
  });
};

export const generateSparkline = (data) => {
  const chars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  return data.map(value => {
    if (range === 0) return chars[4];
    const normalized = (value - min) / range;
    const index = Math.floor(normalized * (chars.length - 1));
    return chars[index];
  }).join('');
};

export const boxDrawing = {
  topLeft: '┌',
  topRight: '┐',
  bottomLeft: '└',
  bottomRight: '┘',
  horizontal: '─',
  vertical: '│',
  teeDown: '┬',
  teeUp: '┴',
  teeRight: '├',
  teeLeft: '┤',
  cross: '┼',
};

export const createBox = (title, content, width = 60) => {
  const topBorder = `┌─[ ${title} ]${'─'.repeat(width - title.length - 5)}┐`;
  const bottomBorder = `└${'─'.repeat(width - 2)}┘`;
  
  const lines = content.split('\n').map(line => {
    const padding = ' '.repeat(Math.max(0, width - line.length - 4));
    return `│ ${line}${padding} │`;
  });

  return [topBorder, ...lines, bottomBorder].join('\n');
};
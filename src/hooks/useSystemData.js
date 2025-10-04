import { useState, useEffect } from 'react';

export const useSystemData = () => {
  const [data, setData] = useState({
    cpu: {
      usage: 0,
      cores: Array(8).fill(0),
      temperature: 45,
      frequency: 3.6
    },
    memory: {
      used: 0,
      total: 16384,
      percentage: 0
    },
    network: {
      upload: 0,
      download: 0,
      totalUp: 0,
      totalDown: 0
    },
    disk: {
      used: 450,
      total: 1000,
      percentage: 45
    },
    processes: [],
    uptime: 0
  });

  // Generate realistic-looking process data
  const generateProcesses = () => {
    const processNames = [
      'neural_link.exe',
      'quantum_processor',
      'cyber_defense',
      'matrix_interface',
      'blockchain_sync',
      'ai_assistant',
      'hologram_render',
      'data_miner',
      'crypto_wallet',
      'firewall_daemon'
    ];

    return processNames.map((name, i) => ({
      pid: 1000 + i,
      name,
      cpu: Math.random() * 15,
      memory: Math.random() * 1024
    })).sort((a, b) => b.cpu - a.cpu);
  };

  useEffect(() => {
    // Initial process list
    setData(prev => ({
      ...prev,
      processes: generateProcesses()
    }));

    // Update system data every second
    const interval = setInterval(() => {
      setData(prev => {
        // Simulate CPU usage with some randomness but trending
        const newCpuUsage = Math.max(10, Math.min(95, 
          prev.cpu.usage + (Math.random() - 0.5) * 20
        ));

        // Simulate per-core CPU usage
        const newCores = prev.cpu.cores.map(() => 
          Math.max(0, Math.min(100, Math.random() * 100))
        );

        // Simulate memory usage (slowly increasing)
        const newMemUsage = Math.max(20, Math.min(90,
          prev.memory.percentage + (Math.random() - 0.48) * 5
        ));

        const newMemUsed = (newMemUsage / 100) * prev.memory.total;

        // Simulate network traffic
        const newUpload = Math.random() * 5000;
        const newDownload = Math.random() * 10000;

        // Update temperature based on CPU usage
        const newTemp = 35 + (newCpuUsage / 100) * 35 + Math.random() * 5;

        // Occasionally update process list
        const shouldUpdateProcesses = Math.random() > 0.7;

        return {
          cpu: {
            usage: newCpuUsage,
            cores: newCores,
            temperature: newTemp,
            frequency: 3.4 + Math.random() * 0.4
          },
          memory: {
            used: newMemUsed,
            total: prev.memory.total,
            percentage: newMemUsage
          },
          network: {
            upload: newUpload,
            download: newDownload,
            totalUp: prev.network.totalUp + newUpload,
            totalDown: prev.network.totalDown + newDownload
          },
          disk: prev.disk,
          processes: shouldUpdateProcesses ? generateProcesses() : prev.processes,
          uptime: prev.uptime + 1
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return data;
};
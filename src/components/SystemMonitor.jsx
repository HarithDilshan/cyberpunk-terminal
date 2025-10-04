import React from 'react';
import { useSystemData } from '../hooks/useSystemData';
import './SystemMonitor.css';

const SystemMonitor = () => {
  const systemData = useSystemData();

  // Create ASCII bar graph
  const createBarGraph = (value, max = 100, width = 30) => {
    const percentage = Math.min(100, (value / max) * 100);
    const filled = Math.floor((percentage / 100) * width);
    const empty = width - filled;
    return '█'.repeat(filled) + '░'.repeat(empty);
  };

  // Format bytes to human readable
  const formatBytes = (bytes) => {
    if (bytes < 1024) return `${bytes.toFixed(0)} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  // Format uptime
  const formatUptime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  // Create mini ASCII chart for CPU cores
  const createMiniChart = (values, height = 5) => {
    const lines = [];
    for (let row = height - 1; row >= 0; row--) {
      let line = '';
      values.forEach(value => {
        const normalizedValue = Math.floor((value / 100) * height);
        line += normalizedValue > row ? '█' : '░';
      });
      lines.push(line);
    }
    return lines;
  };

  return (
    <div className="system-monitor">
      {/* Header */}
      <div className="monitor-header">
        <pre className="header-art">
{`
╔═══════════════════════════════════════════════════════════════════════════╗
║                        SYSTEM MONITOR v2.077                              ║
╚═══════════════════════════════════════════════════════════════════════════╝
`}
        </pre>
      </div>

      <div className="monitor-grid">
        {/* CPU Section */}
        <div className="monitor-section">
          <div className="section-title">
            ┌─[ CPU PERFORMANCE ]─────────────────────────────────────┐
          </div>
          
          <div className="stat-row">
            <span className="stat-label">Overall Usage:</span>
            <span className="stat-value">{systemData.cpu.usage.toFixed(1)}%</span>
          </div>
          <div className="stat-bar">
            [{createBarGraph(systemData.cpu.usage)}]
          </div>

          <div className="stat-row">
            <span className="stat-label">Temperature:</span>
            <span className="stat-value">{systemData.cpu.temperature.toFixed(1)}°C</span>
          </div>
          <div className="stat-bar">
            [{createBarGraph(systemData.cpu.temperature, 100)}]
          </div>

          <div className="stat-row">
            <span className="stat-label">Frequency:</span>
            <span className="stat-value">{systemData.cpu.frequency.toFixed(2)} GHz</span>
          </div>

          <div className="stat-row mini-chart-label">
            <span className="stat-label">Core Activity:</span>
          </div>
          <div className="mini-chart">
            {createMiniChart(systemData.cpu.cores).map((line, i) => (
              <div key={i}>{line}</div>
            ))}
            <div className="chart-labels">
              {systemData.cpu.cores.map((_, i) => `${i + 1}`).join(' ')}
            </div>
          </div>

          <div className="section-footer">
            └──────────────────────────────────────────────────────────┘
          </div>
        </div>

        {/* Memory Section */}
        <div className="monitor-section">
          <div className="section-title">
            ┌─[ MEMORY STATUS ]───────────────────────────────────────┐
          </div>
          
          <div className="stat-row">
            <span className="stat-label">RAM Usage:</span>
            <span className="stat-value">
              {formatBytes(systemData.memory.used * 1024 * 1024)} / {formatBytes(systemData.memory.total * 1024 * 1024)}
            </span>
          </div>
          <div className="stat-bar">
            [{createBarGraph(systemData.memory.percentage)}]
          </div>
          <div className="stat-row">
            <span className="stat-value-center">{systemData.memory.percentage.toFixed(1)}%</span>
          </div>

          <div className="stat-row" style={{ marginTop: '20px' }}>
            <span className="stat-label">Disk Usage:</span>
            <span className="stat-value">
              {systemData.disk.used} GB / {systemData.disk.total} GB
            </span>
          </div>
          <div className="stat-bar">
            [{createBarGraph(systemData.disk.percentage)}]
          </div>
          <div className="stat-row">
            <span className="stat-value-center">{systemData.disk.percentage.toFixed(1)}%</span>
          </div>

          <div className="section-footer">
            └──────────────────────────────────────────────────────────┘
          </div>
        </div>

        {/* Network Section */}
        <div className="monitor-section">
          <div className="section-title">
            ┌─[ NETWORK ACTIVITY ]────────────────────────────────────┐
          </div>
          
          <div className="stat-row">
            <span className="stat-label">↑ Upload:</span>
            <span className="stat-value">{formatBytes(systemData.network.upload)}/s</span>
          </div>
          <div className="stat-bar upload-bar">
            [{createBarGraph(systemData.network.upload, 5000)}]
          </div>

          <div className="stat-row">
            <span className="stat-label">↓ Download:</span>
            <span className="stat-value">{formatBytes(systemData.network.download)}/s</span>
          </div>
          <div className="stat-bar download-bar">
            [{createBarGraph(systemData.network.download, 10000)}]
          </div>

          <div className="stat-row" style={{ marginTop: '20px' }}>
            <span className="stat-label">Total Up:</span>
            <span className="stat-value">{formatBytes(systemData.network.totalUp)}</span>
          </div>

          <div className="stat-row">
            <span className="stat-label">Total Down:</span>
            <span className="stat-value">{formatBytes(systemData.network.totalDown)}</span>
          </div>

          <div className="section-footer">
            └──────────────────────────────────────────────────────────┘
          </div>
        </div>

        {/* Process List Section */}
        <div className="monitor-section monitor-section-wide">
          <div className="section-title">
            ┌─[ ACTIVE PROCESSES ]────────────────────────────────────┐
          </div>
          
          <div className="process-table">
            <div className="process-header">
              <span className="process-pid">PID</span>
              <span className="process-name">NAME</span>
              <span className="process-cpu">CPU%</span>
              <span className="process-mem">MEMORY</span>
            </div>
            {systemData.processes.slice(0, 8).map(proc => (
              <div key={proc.pid} className="process-row">
                <span className="process-pid">{proc.pid}</span>
                <span className="process-name">{proc.name}</span>
                <span className="process-cpu">{proc.cpu.toFixed(1)}%</span>
                <span className="process-mem">{formatBytes(proc.memory * 1024)}</span>
              </div>
            ))}
          </div>

          <div className="section-footer">
            └──────────────────────────────────────────────────────────┘
          </div>
        </div>

        {/* System Info Section */}
        <div className="monitor-section">
          <div className="section-title">
            ┌─[ SYSTEM INFO ]─────────────────────────────────────────┐
          </div>
          
          <div className="info-row">
            <span className="info-label">OS:</span>
            <span className="info-value">CYBER OS v2.077</span>
          </div>
          
          <div className="info-row">
            <span className="info-label">Kernel:</span>
            <span className="info-value">6.66.0-quantum</span>
          </div>
          
          <div className="info-row">
            <span className="info-label">Hostname:</span>
            <span className="info-value">cyberpunk-terminal</span>
          </div>
          
          <div className="info-row">
            <span className="info-label">Uptime:</span>
            <span className="info-value">{formatUptime(systemData.uptime)}</span>
          </div>
          
          <div className="info-row">
            <span className="info-label">Architecture:</span>
            <span className="info-value">x86_64 neural</span>
          </div>

          <div className="section-footer">
            └──────────────────────────────────────────────────────────┘
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitor;
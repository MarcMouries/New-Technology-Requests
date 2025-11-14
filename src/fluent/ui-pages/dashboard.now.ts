import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'

UiPage({
    $id: Now.ID['dashboard'],
    endpoint: 'x_snc_newtech_dashboard.do',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Technology Requests Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%);
            color: #212529;
            line-height: 1.6;
            min-height: 100vh;
        }

        /* Header */
        .dashboard-header {
            background: linear-gradient(135deg, #007A53 0%, #005a3e 100%);
            color: white;
            padding: 2rem;
            box-shadow: 0 4px 20px rgba(0, 122, 83, 0.15);
            position: relative;
            overflow: hidden;
        }

        .dashboard-header::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.1;
        }

        .header-content {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            gap: 2rem;
            position: relative;
            z-index: 1;
        }

        .logo {
            height: 50px;
            width: auto;
            background: white;
            padding: 0.5rem 1rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .logo-fallback {
            background: white;
            color: #DA291C;
            padding: 0.5rem 1.5rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 1.5rem;
            display: none;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .header-title {
            flex: 1;
        }

        .header-title h1 {
            font-size: 2.25rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #FFFFFF 0%, rgba(255,255,255,0.8) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .header-title p {
            font-size: 1.1rem;
            opacity: 0.9;
            font-weight: 400;
        }

        .refresh-btn {
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }

        .refresh-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            border-color: rgba(255, 255, 255, 0.5);
            transform: translateY(-2px);
        }

        /* Main Container */
        .main-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 3rem 2rem;
        }

        /* Metrics Section */
        .metrics-section {
            margin-bottom: 3rem;
        }

        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
        }

        .metric-card {
            background: linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.8);
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .metric-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
        }

        .metric-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #007A53 0%, #FF6720 100%);
        }

        .metric-icon {
            width: 60px;
            height: 60px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            background: linear-gradient(135deg, #007A53 0%, #00a366 100%);
            color: white;
            box-shadow: 0 4px 16px rgba(0, 122, 83, 0.3);
        }

        .metric-card.priority-fast-track .metric-icon {
            background: linear-gradient(135deg, #DA291C 0%, #ff4757 100%);
            box-shadow: 0 4px 16px rgba(218, 41, 28, 0.3);
        }

        .metric-card.priority-high .metric-icon {
            background: linear-gradient(135deg, #FF6720 0%, #ff7f39 100%);
            box-shadow: 0 4px 16px rgba(255, 103, 32, 0.3);
        }

        .metric-value {
            font-size: 3rem;
            font-weight: 800;
            color: #212529;
            line-height: 1;
            margin-bottom: 0.5rem;
        }

        .metric-label {
            font-size: 1rem;
            color: #6C757D;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* Charts Section */
        .charts-section {
            margin-bottom: 3rem;
        }

        .charts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
            gap: 2rem;
        }

        .chart-card {
            background: linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%);
            border-radius: 24px;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.8);
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .chart-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
        }

        .chart-header {
            padding: 2rem;
            background: linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%);
            border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        .chart-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #212529;
            margin-bottom: 0.5rem;
        }

        .chart-subtitle {
            font-size: 1rem;
            color: #6C757D;
            font-weight: 400;
        }

        .chart-body {
            padding: 2rem;
            min-height: 350px;
        }

        /* Phase Chart */
        .phase-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 1rem;
            height: 100%;
        }

        .phase-item {
            background: linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%);
            border-radius: 16px;
            padding: 1.5rem 1rem;
            text-align: center;
            border: 2px solid transparent;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .phase-item::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #007A53 0%, #00a366 100%);
        }

        .phase-item:hover {
            transform: translateY(-4px);
            border-color: rgba(0, 122, 83, 0.2);
            box-shadow: 0 8px 24px rgba(0, 122, 83, 0.15);
        }

        .phase-count {
            font-size: 2.5rem;
            font-weight: 800;
            color: #007A53;
            line-height: 1;
            margin-bottom: 0.5rem;
        }

        .phase-name {
            font-size: 0.85rem;
            color: #495057;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        /* Priority Chart */
        .priority-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 1.5rem;
            height: 100%;
        }

        .priority-item {
            border-radius: 16px;
            padding: 1.5rem;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .priority-item:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .priority-fast-track { background: linear-gradient(135deg, #DA291C 0%, #ff4757 100%); }
        .priority-high { background: linear-gradient(135deg, #FF6720 0%, #ff7f39 100%); }
        .priority-medium { background: linear-gradient(135deg, #007A53 0%, #00a366 100%); }
        .priority-low { background: linear-gradient(135deg, #6C757D 0%, #8e9aaf 100%); }

        .priority-count {
            font-size: 2.5rem;
            font-weight: 800;
            line-height: 1;
            margin-bottom: 0.5rem;
        }

        .priority-name {
            font-size: 0.9rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        /* Table Section */
        .table-section {
            background: linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%);
            border-radius: 24px;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.8);
            overflow: hidden;
        }

        .table-header {
            padding: 2rem;
            background: linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%);
            border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        .table-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #212529;
            margin-bottom: 0.5rem;
        }

        .table-subtitle {
            font-size: 1rem;
            color: #6C757D;
            font-weight: 400;
        }

        .table-container {
            overflow-x: auto;
        }

        .requests-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.95rem;
        }

        .requests-table th {
            background: linear-gradient(135deg, #F1F3F4 0%, #F8F9FA 100%);
            padding: 1.25rem 1.5rem;
            text-align: left;
            font-weight: 700;
            font-size: 0.85rem;
            color: #495057;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid rgba(0, 122, 83, 0.1);
        }

        .requests-table td {
            padding: 1.25rem 1.5rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            vertical-align: middle;
        }

        .requests-table tbody tr {
            transition: all 0.2s ease;
        }

        .requests-table tbody tr:hover {
            background: linear-gradient(135deg, rgba(0, 122, 83, 0.02) 0%, rgba(0, 122, 83, 0.05) 100%);
            transform: scale(1.001);
        }

        .request-number {
            font-weight: 700;
            color: #007A53;
            font-family: 'Monaco', 'Menlo', monospace;
        }

        /* Badges */
        .badge {
            display: inline-flex;
            align-items: center;
            padding: 0.5rem 1rem;
            border-radius: 50px;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .badge-phase-new { background: rgba(218, 41, 28, 0.1); color: #DA291C; }
        .badge-phase-review { background: rgba(255, 103, 32, 0.1); color: #FF6720; }
        .badge-phase-architecture { background: rgba(0, 122, 83, 0.1); color: #007A53; }
        .badge-phase-proposal { background: rgba(0, 122, 83, 0.15); color: #007A53; }
        .badge-phase-funding { background: rgba(0, 122, 83, 0.2); color: #007A53; }

        .badge-priority-fast_track { background: #DA291C; color: white; }
        .badge-priority-high { background: #FF6720; color: white; }
        .badge-priority-medium { background: #007A53; color: white; }
        .badge-priority-low { background: #6C757D; color: white; }

        /* Loading */
        .loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 4rem;
            color: #6C757D;
        }

        .spinner-container {
            margin-bottom: 1rem;
        }

        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #E9ECEF;
            border-top: 4px solid #007A53;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .loading-text {
            font-size: 1.1rem;
            font-weight: 500;
        }

        /* Empty State */
        .empty-state {
            text-align: center;
            padding: 4rem;
            color: #6C757D;
        }

        .empty-state h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #495057;
        }

        /* Error State */
        .error-state {
            background: linear-gradient(135deg, rgba(220, 53, 69, 0.05) 0%, rgba(220, 53, 69, 0.1) 100%);
            border: 2px solid rgba(220, 53, 69, 0.2);
            border-radius: 16px;
            padding: 2rem;
            margin: 2rem;
            color: #721c24;
            text-align: center;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .main-container {
                padding: 2rem 1rem;
            }
            
            .dashboard-header {
                padding: 1.5rem;
            }
            
            .header-content {
                flex-direction: column;
                text-align: center;
                gap: 1rem;
            }
            
            .header-title h1 {
                font-size: 1.75rem;
            }
            
            .metrics-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
            
            .charts-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
            
            .phase-grid,
            .priority-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .requests-table {
                font-size: 0.85rem;
            }
            
            .requests-table th,
            .requests-table td {
                padding: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="dashboard-header">
        <div class="header-content">
            <img src="https://www.7-eleven.com/assets/img/header/7e-logo-color.svg" 
                 alt="7-Eleven" class="logo"
                 onerror="this.style.display='none';this.nextElementSibling.style.display='block';">
            <div class="logo-fallback">7-ELEVEn</div>
            <div class="header-title">
                <h1>Technology Requests Dashboard</h1>
                <p>Real-time insights into your technology request pipeline and governance workflow</p>
            </div>
            <button class="refresh-btn" onclick="dashboard.refresh()">
                🔄 Refresh Data
            </button>
        </div>
    </div>

    <div class="main-container">
        <!-- Metrics -->
        <div class="metrics-section">
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-icon">📊</div>
                    <div class="metric-value" id="total-requests">-</div>
                    <div class="metric-label">Total Requests</div>
                </div>
                <div class="metric-card priority-fast-track">
                    <div class="metric-icon">🚀</div>
                    <div class="metric-value" id="fast-track-count">-</div>
                    <div class="metric-label">Fast Track</div>
                </div>
                <div class="metric-card priority-high">
                    <div class="metric-icon">⚡</div>
                    <div class="metric-value" id="high-priority-count">-</div>
                    <div class="metric-label">High Priority</div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon">📅</div>
                    <div class="metric-value" id="avg-age">-</div>
                    <div class="metric-label">Avg Age (Days)</div>
                </div>
            </div>
        </div>

        <!-- Charts -->
        <div class="charts-section">
            <div class="charts-grid">
                <div class="chart-card">
                    <div class="chart-header">
                        <h3 class="chart-title">Requests by Phase</h3>
                        <p class="chart-subtitle">Distribution across workflow phases</p>
                    </div>
                    <div class="chart-body">
                        <div id="phase-chart">
                            <div class="loading">
                                <div class="spinner-container">
                                    <div class="spinner"></div>
                                </div>
                                <div class="loading-text">Loading phase data...</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="chart-card">
                    <div class="chart-header">
                        <h3 class="chart-title">Requests by Priority</h3>
                        <p class="chart-subtitle">Priority level distribution</p>
                    </div>
                    <div class="chart-body">
                        <div id="priority-chart">
                            <div class="loading">
                                <div class="spinner-container">
                                    <div class="spinner"></div>
                                </div>
                                <div class="loading-text">Loading priority data...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Table -->
        <div class="table-section">
            <div class="table-header">
                <h3 class="table-title">New Technology Requests</h3>
                <p class="table-subtitle">Recent technology request submissions and their current status</p>
            </div>
            <div class="table-container">
                <div id="requests-table">
                    <div class="loading">
                        <div class="spinner-container">
                            <div class="spinner"></div>
                        </div>
                        <div class="loading-text">Loading request data...</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `,
    clientScript: `
        class Dashboard {
            constructor() {
                this.requests = [];
                this.init();
            }

            async init() {
                console.log('🚀 Dashboard initializing...');
                try {
                    await this.loadData();
                    this.render();
                } catch (error) {
                    console.error('❌ Dashboard error:', error);
                    this.showError(error.message);
                }
            }

            async loadData() {
                console.log('📡 Loading requests...');
                
                const response = await fetch('/api/now/table/x_snc_newtech_request?sysparm_display_value=all&sysparm_limit=100&sysparm_query=ORDERBYDESCsys_created_on', {
                    headers: {
                        'Accept': 'application/json',
                        'X-UserToken': window.g_ck
                    }
                });

                if (!response.ok) {
                    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
                }

                const data = await response.json();
                this.requests = data.result || [];
                console.log(\`✅ Loaded \${this.requests.length} requests\`);
            }

            render() {
                console.log('🎨 Rendering dashboard...');
                this.renderMetrics();
                this.renderPhaseChart();
                this.renderPriorityChart();
                this.renderTable();
            }

            renderMetrics() {
                const total = this.requests.length;
                const fastTrack = this.requests.filter(r => this.getValue(r.x_snc_newtech_priority) === 'fast_track').length;
                const high = this.requests.filter(r => this.getValue(r.x_snc_newtech_priority) === 'high').length;
                
                let avgAge = 0;
                if (total > 0) {
                    const today = new Date();
                    const totalAge = this.requests.reduce((sum, r) => {
                        const created = new Date(this.getValue(r.sys_created_on));
                        return sum + Math.floor((today - created) / (1000 * 60 * 60 * 24));
                    }, 0);
                    avgAge = Math.round(totalAge / total);
                }

                document.getElementById('total-requests').textContent = total;
                document.getElementById('fast-track-count').textContent = fastTrack;
                document.getElementById('high-priority-count').textContent = high;
                document.getElementById('avg-age').textContent = avgAge;
            }

            renderPhaseChart() {
                const phases = {
                    'New Request': 0,
                    'Initial Review': 0,
                    'Architecture': 0,
                    'Proposal': 0,
                    'Funding': 0
                };

                const phaseMap = {
                    'one_new_request': 'New Request',
                    'two_initial_review': 'Initial Review',
                    'three_architecture_review': 'Architecture',
                    'four_proposal': 'Proposal',
                    'five_trigger_funding': 'Funding'
                };

                this.requests.forEach(r => {
                    const phase = this.getValue(r.x_snc_newtech_phase);
                    const phaseName = phaseMap[phase] || 'New Request';
                    phases[phaseName]++;
                });

                let html = '<div class="phase-grid">';
                Object.entries(phases).forEach(([name, count]) => {
                    html += \`
                        <div class="phase-item">
                            <div class="phase-count">\${count}</div>
                            <div class="phase-name">\${name}</div>
                        </div>
                    \`;
                });
                html += '</div>';

                document.getElementById('phase-chart').innerHTML = html;
            }

            renderPriorityChart() {
                const priorities = {
                    'Fast Track': 0,
                    'High': 0,
                    'Medium': 0,
                    'Low': 0
                };

                const priorityMap = {
                    'fast_track': 'Fast Track',
                    'high': 'High',
                    'medium': 'Medium',
                    'low': 'Low'
                };

                this.requests.forEach(r => {
                    const priority = this.getValue(r.x_snc_newtech_priority);
                    const priorityName = priorityMap[priority] || 'Low';
                    priorities[priorityName]++;
                });

                let html = '<div class="priority-grid">';
                Object.entries(priorities).forEach(([name, count]) => {
                    const className = 'priority-' + name.toLowerCase().replace(' ', '-');
                    html += \`
                        <div class="priority-item \${className}">
                            <div class="priority-count">\${count}</div>
                            <div class="priority-name">\${name}</div>
                        </div>
                    \`;
                });
                html += '</div>';

                document.getElementById('priority-chart').innerHTML = html;
            }

            renderTable() {
                if (this.requests.length === 0) {
                    document.getElementById('requests-table').innerHTML = \`
                        <div class="empty-state">
                            <h3>No Requests Found</h3>
                            <p>No technology requests have been submitted yet. Use the intake form to create your first request.</p>
                        </div>
                    \`;
                    return;
                }

                let html = \`
                    <table class="requests-table">
                        <thead>
                            <tr>
                                <th>Request Number</th>
                                <th>Description</th>
                                <th>Phase</th>
                                <th>Priority</th>
                                <th>Cost Estimate</th>
                                <th>Created Date</th>
                            </tr>
                        </thead>
                        <tbody>
                \`;

                this.requests.forEach(r => {
                    const number = this.getValue(r.number) || 'N/A';
                    const description = this.getValue(r.short_description) || 'No description provided';
                    const phase = this.getPhaseDisplay(this.getValue(r.x_snc_newtech_phase));
                    const priority = this.getPriorityDisplay(this.getValue(r.x_snc_newtech_priority));
                    const cost = this.getCostDisplay(this.getValue(r.x_snc_newtech_estimated_cost_band));
                    const created = new Date(this.getValue(r.sys_created_on)).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });

                    html += \`
                        <tr>
                            <td><span class="request-number">\${number}</span></td>
                            <td>\${description}</td>
                            <td><span class="badge \${this.getPhaseClass(this.getValue(r.x_snc_newtech_phase))}">\${phase}</span></td>
                            <td><span class="badge \${this.getPriorityClass(this.getValue(r.x_snc_newtech_priority))}">\${priority}</span></td>
                            <td>\${cost}</td>
                            <td>\${created}</td>
                        </tr>
                    \`;
                });

                html += '</tbody></table>';
                document.getElementById('requests-table').innerHTML = html;
            }

            getValue(field) {
                if (!field) return '';
                if (typeof field === 'string') return field;
                return field.display_value || field.value || '';
            }

            getPhaseDisplay(phase) {
                const map = {
                    'one_new_request': 'New Request',
                    'two_initial_review': 'Initial Review',
                    'three_architecture_review': 'Architecture',
                    'four_proposal': 'Proposal',
                    'five_trigger_funding': 'Funding'
                };
                return map[phase] || 'Unknown';
            }

            getPriorityDisplay(priority) {
                const map = {
                    'fast_track': 'Fast Track',
                    'high': 'High',
                    'medium': 'Medium',
                    'low': 'Low'
                };
                return map[priority] || 'Unknown';
            }

            getCostDisplay(cost) {
                const map = {
                    'under_fifty_k': '<$50K',
                    'fifty_to_two_fifty_k': '$50K-$249K',
                    'two_fifty_k_to_one_m': '$250K-$999K',
                    'one_to_five_m': '$1M-$4.9M',
                    'five_m_plus': '$5M+',
                    'unknown': 'Unknown'
                };
                return map[cost] || 'N/A';
            }

            getPhaseClass(phase) {
                const map = {
                    'one_new_request': 'badge-phase-new',
                    'two_initial_review': 'badge-phase-review',
                    'three_architecture_review': 'badge-phase-architecture',
                    'four_proposal': 'badge-phase-proposal',
                    'five_trigger_funding': 'badge-phase-funding'
                };
                return map[phase] || 'badge-phase-new';
            }

            getPriorityClass(priority) {
                return \`badge-priority-\${priority}\`;
            }

            showError(message) {
                document.querySelector('.main-container').innerHTML = \`
                    <div class="error-state">
                        <h3>⚠️ Dashboard Error</h3>
                        <p><strong>Unable to load dashboard data:</strong></p>
                        <p>\${message}</p>
                        <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.75rem 1.5rem; background: linear-gradient(135deg, #007A53 0%, #00a366 100%); color: white; border: none; border-radius: 50px; cursor: pointer; font-weight: 600;">🔄 Reload Dashboard</button>
                    </div>
                \`;
            }

            refresh() {
                console.log('🔄 Refreshing dashboard...');
                location.reload();
            }
        }

        // Global dashboard instance
        let dashboard;
        
        document.addEventListener('DOMContentLoaded', () => {
            dashboard = new Dashboard();
        });
    `,
    category: 'general'
})
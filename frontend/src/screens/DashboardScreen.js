import DashboardMenu from '../components/DashboardMenu';

const DashboardScreen = {
    after_render: () => {},
    render: () => {
        return `
        <section class="menu-section">
            <div class="dashboard">
            ${DashboardMenu.render({ selected: 'dashboard' })}
            <div class="dashboard-content">
            <h1>Dashboard</h1>
            <div>
                Info and Charts will be added here
            </div>
            </div>
            </div>
        </section>
        `;
    },
};
export default DashboardScreen;
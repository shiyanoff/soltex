import React, { useEffect, useState } from "react";
import { ApiClient } from "adminjs";
import { useNavigate } from "react-router-dom";

const api = new ApiClient();

const Dashboard = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        api.getDashboard().then((res) => {
            setData(res.data);
        });
    }, []);

    if (!data) return <div style={{ padding: 20 }}>Загрузка...</div>;

    return (
        <div style={wrapper}>
            <h1 style={title}>Дашборд</h1>

            <div style={grid}>
                <Card
                    title="Категории"
                    value={data.categoriesCount}
                    icon={<ServiceIcon />}
                    color="#C41E3A"
                    resource="Category"
                />

                <Card
                    title="Проекты"
                    value={data.itemsCount}
                    icon={<WorkIcon />}
                    color="#8B1E34"
                    resource="Item"
                />

                <Card
                    title="Заявки"
                    value={data.leadsCount}
                    icon={<LeadIcon />}
                    color="#D94A62"
                    resource="Lead"
                />
            </div>
        </div>
    );
};

const Card = ({ title, value, icon, color, resource }: any) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/admin/resources/${resource}`)}
            style={{
                ...card,
                borderLeft: `6px solid ${color}`,
                cursor: "pointer",
            }}
        >
            <div style={top}>
                <div style={{ ...iconWrapper, background: `${color}20` }}>
                    {icon}
                </div>

                <div style={{ ...valueStyle, color }}>{value}</div>
            </div>

            <div style={label}>{title}</div>
        </div>
    );
};

//////////////////////
// 🔧 ИКОНКИ
//////////////////////

const ServiceIcon = () => (

    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">

        <rect x="3" y="3" width="7" height="7" rx="2" fill="#C41E3A"/>

        <rect x="14" y="3" width="7" height="7" rx="2" fill="#C41E3A"/>

        <rect x="3" y="14" width="7" height="7" rx="2" fill="#C41E3A"/>

        <rect x="14" y="14" width="7" height="7" rx="2" fill="#C41E3A"/>

    </svg>

);

const WorkIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect
            x="5"
            y="3"
            width="14"
            height="18"
            rx="2"
            stroke="#8B1E34"
            strokeWidth="2"
        />
        <path d="M9 7H10" stroke="#8B1E34" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 7H15" stroke="#8B1E34" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 11H10" stroke="#8B1E34" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 11H15" stroke="#8B1E34" strokeWidth="2" strokeLinecap="round"/>
        <path d="M11 21V17H13V21" stroke="#8B1E34" strokeWidth="2"/>
    </svg>
);

const LeadIcon = () => (
    <svg width="20" height="20" fill="#D94A62" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
);

// СТИЛИ

const wrapper = {
    padding: "40px",
    background: "#f8f8f8",
    minHeight: "100vh",
};

const title = {
    marginBottom: "30px",
    fontSize: "26px",
    fontWeight: 700,
    color: "#1E293B",
};

const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
};

const card = {
    flex: 1,
    padding: "24px",
    borderRadius: "14px",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
    transition: "0.2s",
};

const top = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const iconWrapper = {
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const valueStyle = {
    fontSize: "28px",
    fontWeight: 700,
};

const label = {
    fontSize: "14px",
};

export default Dashboard;

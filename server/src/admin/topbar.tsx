import React, { useState, useRef, useEffect } from "react";
import { Box, Icon, Avatar } from "@adminjs/design-system";
import {useCurrentAdmin} from "adminjs";

const TopBar = (props) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [admin] = useCurrentAdmin();

    const { toggleSidebar } = props;

    // закрытие при клике вне
    useEffect(() => {
        const handleClick = (e: any) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return (
        <Box
            bg="white"
            px="xl"
            py="lg"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid #E2E8F0"
            style={{
                position: "sticky",
                top: 0,
                zIndex: 100,
            }}
        >
            {/* LEFT */}
            <Box display="flex" alignItems="center">
                {/* MENU BUTTON */}
                <Box
                    mr="lg"
                    display={["block", "block", "block", "block", "none"]}
                    style={{
                        cursor: "pointer",
                        padding: "6px",
                        borderRadius: "8px",
                    }}
                    onClick={toggleSidebar}
                >
                    <Icon icon="Menu" />
                </Box>

                <Box color="grey60" style={{ fontSize: "16px" }}>
                    Панель управления
                </Box>
            </Box>

            {/* RIGHT */}
            <Box display="flex" alignItems="center">

                {/* USER + DROPDOWN */}
                <Box position="relative" ref={ref}>
                    <Box
                        display="flex"
                        alignItems="center"
                        style={{
                            cursor: "pointer",
                            padding: "6px 10px",
                            borderRadius: "10px",
                            transition: "0.2s",
                            gap: "4px"
                        }}
                        onClick={() => setOpen(!open)}
                    >
                        <Box alignItems="center" display="flex" style={{
                            gap: "8px",

                        }}>
                            <Avatar
                                style={{
                                    background: "#96132b",
                                    color: "#fff",
                                }}
                            >
                                {admin?.username?.[0]?.toUpperCase() || "A"}
                            </Avatar>

                            <Box fontSize="sm" fontWeight="500">
                                {admin?.username}
                            </Box>
                        </Box>

                        <Icon icon="ChevronDown" />
                    </Box>

                    {/* DROPDOWN */}
                    {open && (
                        <Box
                            position="absolute"
                            top="110%"
                            right={0}
                            bg="white"
                            width="180px"
                            borderRadius="12px"
                            boxShadow="0 10px 30px rgba(0,0,0,0.08)"
                            border="1px solid #E2E8F0"
                            p="sm"
                        >
                            {/*<DropdownItem*/}
                            {/*    icon="User"*/}
                            {/*    label="Профиль"*/}
                            {/*    onClick={() => {*/}
                            {/*        window.location.href = "/admin/pages/profile";*/}
                            {/*    }}*/}
                            {/*/>*/}

                            {/*<DropdownItem*/}
                            {/*    icon="Lock"*/}
                            {/*    label="Сменить пароль"*/}
                            {/*    onClick={() => {*/}
                            {/*        window.location.href = "/admin/pages/profile";*/}
                            {/*    }}*/}
                            {/*/>*/}

                            {/*<Divider />*/}

                            <DropdownItem
                                icon="LogOut"
                                label="Выйти"
                                danger
                                onClick={() => {
                                    window.location.href = "/admin/logout";
                                }}
                            />
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};


const DropdownItem = ({ icon, label, onClick, danger }: any) => (
    <Box
        display="flex"
        alignItems="center"
        px="md"
        py="md"
        style={{
            cursor: "pointer",
            borderRadius: "10px",
            transition: "0.2s",
            color: danger ? "#DC2626" : "#1E293B",
            gap: "10px",
        }}
        onClick={onClick}
        onMouseEnter={(e: any) => {
            e.currentTarget.style.background = "#F1F5F9";
        }}
        onMouseLeave={(e: any) => {
            e.currentTarget.style.background = "transparent";
        }}
    >
        <Icon icon={icon} />
        <Box fontSize="sm">{label}</Box>
    </Box>
);

const Divider = () => (
    <Box
        height="1px"
        bg="#E2E8F0"
        my="sm"
    />
);

export default TopBar;

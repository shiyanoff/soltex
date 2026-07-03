import React, { useState } from "react";
import { Box, Button, H2, Input } from "@adminjs/design-system";

const gradientConfig = {
    angle: 135,
    colors: [
        { color: "#1A1A1A", stop: "0%" },
    ],
};

const getGradient = () => {
    const stops = gradientConfig.colors
        .map((c) => `${c.color} ${c.stop}`)
        .join(", ");

    return `linear-gradient(${gradientConfig.angle}deg, ${stops})`;
};

const Login = (props: any) => {
    const { action, errorMessage } = props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Box style={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "row",
        }}>
            <Box
                className="login-left"
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: getGradient(),
                    position: "relative",
                    color: "white",
                }}
            >
                <Box style={{ textAlign: "left" }}>
                    <img
                        src="/logo.png"
                        alt="logo"
                        style={{
                            width: "400px",
                            marginBottom: 20,
                            borderRadius: "8px",
                        }}
                    />

                    <p style={{ fontSize: 24, opacity: 0.8 }}>
                        Панель управления
                    </p>
                </Box>
            </Box>
            <Box
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#F8FAFC",
                }}
            >
                <Box
                    style={{
                        width: 360,
                        padding: 32,
                        background: "#fff",
                        borderRadius: 16,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
                    }}
                >
                    <H2 style={{marginBottom: 16, fontSize: 24}}>
                        Вход в систему
                    </H2>

                    <form method="post" action={action}>
                        <Box style={{display: "flex", flexDirection: "column", gap: 16}}>

                            <Input
                                name="email"
                                placeholder="Логин"
                                value={email}
                                onChange={(e: any) => setEmail(e.target.value)}
                            />

                            <Input
                                name="password"
                                type="password"
                                placeholder="Пароль"
                                value={password}
                                onChange={(e: any) => setPassword(e.target.value)}
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                block={true}
                            >
                                Войти
                            </Button>

                        </Box>

                        {errorMessage && (
                            <Box mt="md" color="red">
                                {errorMessage}
                            </Box>
                        )}
                    </form>
                </Box>
            </Box>
            <style>
                {`
          @media (max-width: 768px) {
            .login-left {
              display: none !important;
            }
          }
        `}
            </style>
        </Box>
    );
};

export default Login;

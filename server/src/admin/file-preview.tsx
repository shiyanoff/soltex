import { Box, Icon } from "@adminjs/design-system";
import React from "react";

const BASE_URL = window.location.origin + "/api";

const getYouTubeId = (url) => {
    if (url.includes("shorts/")) {
        return url.split("shorts/")[1].split("?")[0];
    }
    if (url.includes("watch?v=")) {
        return url.split("watch?v=")[1].split("&")[0];
    }
    if (url.includes("youtu.be/")) {
        return url.split("youtu.be/")[1].split("?")[0];
    }
    return null;
};

const isYouTube = (url) =>
    url.includes("youtube.com") || url.includes("youtu.be");

const FilePreview = ({ record, property, where }) => {
    const raw = record?.params?.[property.name];

    if (!raw) {
        return <span style={{ color: "#9CA3AF" }}>—</span>;
    }

    const src = raw.startsWith("http")
        ? raw
        : `${BASE_URL}${raw}`;

    const isImage = /\.(jpg|jpeg|png|webp|svg)$/i.test(src);
    const isVideo = /\.(mp4|webm|mov)$/i.test(src);

    return (
        <Box
            style={{
                display: "flex",
                alignItems: "center",
                paddingBottom: where === "show" ? 24 : 0,
            }}
        >
            {/* IMAGE */}
            {isImage && (
                <img
                    src={src}
                    alt="file"
                    style={{
                        width: 32,
                        height: 32,
                        objectFit: "cover",
                        borderRadius: "50%",
                        background: "#F3F4F6",
                    }}
                />
            )}

            {/* VIDEO FILE */}
            {isVideo && (
                <video
                    src={src}
                    muted
                    style={{
                        width: 32,
                        height: 32,
                        objectFit: "cover",
                        borderRadius: "50%",
                        background: "#000",
                    }}
                />
            )}

            {/* YOUTUBE */}
            {!isImage && !isVideo && isYouTube(src) && (() => {
                const id = getYouTubeId(src);
                if (!id) return null;

                const thumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

                return (
                    <a href={src} target="_blank">
                        <Box
                            style={{
                                position: "relative",
                                width: 32,
                                height: 32,
                            }}
                        >
                            <img
                                src={thumb}
                                alt="youtube"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                }}
                            />

                            {/* ▶ overlay */}
                            <Box
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#fff",
                                    fontSize: 10,
                                }}
                            >
                                ▶
                            </Box>
                        </Box>
                    </a>
                );
            })()}

            {/* OTHER LINKS */}
            {!isImage && !isVideo && !isYouTube(src) && (
                <a href={src} target="_blank">
                    <Box
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: "#F1F5F9",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Icon icon="Globe" />
                    </Box>
                </a>
            )}
        </Box>
    );
};

export default FilePreview;

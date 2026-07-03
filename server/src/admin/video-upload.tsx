import { Box, Label, Text, Icon } from '@adminjs/design-system';
import React, { useState } from 'react';

const VideoUpload = ({ property, record, onChange }) => {
    const [preview, setPreview] = useState(null);

    const currentVideo =
        preview ||
        (record?.params?.videoFile
            ? record.params.videoFile
            : null);


    const handleChange = (file) => {
        if (!file) return;

        onChange({
            ...record,
            params: {
                ...record.params,
                [property.name]: [file],
            },
        });

        const url = URL.createObjectURL(file);
        setPreview(url);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        handleChange(file);
    };

    const handleSelect = (e) => {
        const file = e.target.files?.[0];
        handleChange(file);
    };

    const removeFile = () => {
        setPreview(null);

        onChange({
            ...record,
            params: {
                ...record.params,
                [property.name]: null,
                videoFile: null,
            },
        });
    };

    const inputId = `upload-${property.path}`;

    return (
        <Box marginBottom="xl">

            <Label>{"Видео файл"}</Label>

            {/* DROP ZONE */}

            <Box
                onClick={() => document.getElementById(inputId)?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                style={{
                    border: "2px dashed #E0E0E0FF",
                    borderRadius: 12,
                    padding: 20,
                    textAlign: "center",
                    background: "#fafafa",
                    cursor: "pointer",
                }}
            >
                <p style={{marginBottom: 8}}>
                    Перетащите видео сюда
                </p>

                <p style={{fontSize: 12, color: "#64748B"}}>
                    или
                </p>

                <label
                    style={{
                        display: "inline-block",
                        marginTop: 8,
                        padding: "6px 12px",
                        background: "#e7e7e7",
                        color: "black",
                        borderRadius: 6,
                        cursor: "pointer",
                    }}
                >
                    Выбрать файл
                    <input
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime"
                        onChange={handleSelect}
                        style={{display: "none"}}
                    />
                </label>

                <p style={{marginTop: 10, fontSize: 12, color: "#94A3B8"}}>
                    Поддерживается: mp4, webm, mov
                </p>
            </Box>

            {/* PREVIEW */}
            {currentVideo && (
                <Box
                    mt="md"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: "1px solid #E5E7EB",
                        borderRadius: 12,
                        padding: 12,
                        background: "#FFFFFF",
                    }}
                >
                    {/* LEFT: VIDEO */}
                    <Box style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <video
                            src={currentVideo}
                            style={{
                                width: 80,
                                height: 50,
                                objectFit: "cover",
                                borderRadius: 6,
                            }}
                        />

                        <Text fontSize="13px">
                            {record?.params?.videoFile || "video.mp4"}
                        </Text>
                    </Box>

                    {/* RIGHT: REMOVE */}
                    <Box
                        onClick={removeFile}
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            border: "1px solid #E5E7EB",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                    >
                        <Icon icon="X" />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default VideoUpload;

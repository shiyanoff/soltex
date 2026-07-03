import { Box, Label, Text, Icon } from '@adminjs/design-system';
import React, { useState } from 'react';

const BASE_URL = window.location.origin + "/api";

const getLabel = (property) => {
    const map = {
        uploadImage: "Картинка",
        uploadIcon: "Иконка",
    };

    return map[property.name] || property.label;
};

const ImageUpload = ({ property, record, onChange }) => {
    const [preview, setPreview] = useState(null);
    
    const keyMap = {
        uploadImage:
            Object.keys(record?.params || {})
                .find(
                    key =>
                        key.toLowerCase().includes("image")
                        && key !== "uploadImage"
                ) || "image",
        uploadIcon: "icon",
    };

    const rawUpload = record?.params?.[property.name];
    const rawStored = record?.params?.[keyMap[property.name]];

    const value = Array.isArray(rawUpload)
        ? rawUpload[0]
        : rawStored;

    const getImageSrc = () => {
        if (preview) return preview;

        if (!value) return null;

        if (typeof value === "string") {
            return value.startsWith("http")
                ? value
                : `${BASE_URL}${value}`;
        }

        if (value instanceof File) {
            return URL.createObjectURL(value);
        }

        return null;
    };

    const currentImage = getImageSrc();

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

        const key = keyMap[property.name];

        onChange({
            ...record,
            params: {
                ...record.params,
                [property.name]: null,
                [key]: null,
            },
        });
    };

    const inputId = `upload-${property.path}`;

    return (
        <Box marginBottom="xl">

            <Label>{getLabel(property)}</Label>

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
                    Перетащите изображение сюда
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
                        accept="image/png,image/jpeg,image/svg+xml,image/webp"
                        onChange={handleSelect}
                        style={{display: "none"}}
                    />
                </label>

                <p style={{marginTop: 10, fontSize: 12, color: "#94A3B8"}}>
                    Поддерживается: PNG, SVG, JPG, WEBP
                </p>
            </Box>

            {/* PREVIEW */}
            {currentImage && (
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
                    <Box style={{display: "flex", alignItems: "center", gap: 12}}>
                        <img
                            src={currentImage}
                            alt="preview"
                            style={{
                                width: 50,
                                height: 50,
                                objectFit: "contain",
                                borderRadius: 6,
                                background: "#F3F4F6",
                                padding: 6,
                            }}
                        />

                        <Text fontSize="13px">
                            {typeof value === "string"
                                ? value.split('/').pop()
                                : value?.name || "image.png"}
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

export default ImageUpload;

import AdminJS, {ComponentLoader, ValidationError} from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource, getModelByName } from "@adminjs/prisma";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import path from "path";
import uploadFeature from '@adminjs/upload';
import locale_ru from "./admin/locale/ru.json" with { type: "json" };

const prisma = new PrismaClient();

const componentLoader = new ComponentLoader();

const Components = {
    Dashboard: componentLoader.add("Dashboard", "./admin/dashboard.tsx"),
    TopBar: componentLoader.override("TopBar", "./admin/topbar.tsx"),

    Login: componentLoader.override(
        "Login",
        "./admin/login.tsx"
    ),

    VideoUpload: componentLoader.add(
        "VideoUpload",
        "./admin/video-upload.tsx"
    ),

    ImageUpload: componentLoader.add(
        "ImageUpload",
        "./admin/image-upload.tsx"
    ),

    FilePreview: componentLoader.add(
        "FilePreview",
        "./admin/file-preview.tsx"
    ),
};

const dashboardHandler = async () => {
    const categoriesCount = await prisma.category.count();
    const itemsCount = await prisma.item.count();
    const leadsCount = await prisma.lead.count();

    return {
        categoriesCount,
        itemsCount,
        leadsCount
    };
};

AdminJS.registerAdapter({ Database, Resource });

const admin = new AdminJS({
    rootPath: "/admin",
    assets: {
        styles: ["/admin.css"],
    },
    dashboard: {
        component: Components.Dashboard,
        handler: dashboardHandler,
    },
    locale: {
        language: "ru",
        availableLanguages: ["ru"],

        translations: {
            ru: locale_ru,
        },
    },

    componentLoader,

    branding: {
        companyName: "SOLTEX GROUP Admin",
        logo: "/logo.png",
        withMadeWithLove: false,
        theme: {
            colors: {
                primary100: "#96132b", // самый темный
                primary80: "#9F1830",
                primary60: "#C41E3A", // основной
                primary40: "#D94A62",
                primary20: "#F2A8B4",

                accent: "#0F172A",
                hoverBg: "#FFF1F3",
                border: "#F1D5DA",
                bg: "#f8f8f8",
                container: "#FFFFFF",

                // текст
                text: "#0F172A",

                // доп
                filterBg: "#FFF5F6",
                inputBorder: "#E9C7CD",
                success: "#16A34A",
                error: "#DC2626",
            },
        },
    },

    resources: [
        {
            resource: {
                model: getModelByName("Category", { Prisma }),
                client: prisma,
            },

            options: {
                navigation: "Мой сайт",
                label: "Категории",
                titleProperty: "titleRu",

                listProperties: [
                    "titleRu",
                    "titleEn",
                    "titleZh",
                    "layoutType"
                ],

                editProperties: [
                    "titleRu",
                    "titleEn",
                    "titleZh",
                    "layoutType"
                ],

                properties: {

                    titleRu: {
                        label: "Название (RU)"
                    },

                    titleEn: {
                        label: "Название (EN)"
                    },

                    titleZh: {
                        label: "Название (ZH)"
                    },

                    layoutType: {
                        label: "Шаблон отображения",

                        availableValues: [
                            {
                                value: "grid",
                                label: "Сетка (3 карточки)"
                            },
                            {
                                value: "showcase",
                                label: "Шахматный"
                            }
                        ]
                    }

                }
            }
        },
        {

            resource: {

                model: getModelByName("Item", { Prisma }),

                client: prisma,

            },

            options: {
                label: "Проекты",
                navigation: "Мой сайт",
                titleProperty: "titleRu",

                listProperties: [
                    "id",
                    "image",
                    "titleRu",
                    "titleEn",
                    "titleZh",
                    "category",
                    "projectYear",
                ],

                editProperties: [
                    "titleRu",
                    "titleEn",
                    "titleZh",
                    "countryRu",
                    "countryEn",
                    "countryZh",
                    "projectYear",
                    "descriptionRu",
                    "descriptionEn",
                    "descriptionZh",
                    "category",
                    "uploadImage",
                ],

                properties: {

                    titleRu: {

                        label: "Название (RU)"

                    },

                    titleEn: {

                        label: "Название (EN)"

                    },

                    titleZh: {
                        label: "Название (ZH)"
                    },

                    countryRu: {
                        label: "Страна (RU)"
                    },

                    countryEn: {
                        label: "Страна (EN)"
                    },

                    countryZh: {
                        label: "Страна (ZH)"
                    },

                    projectYear: {

                        label: "Год проекта"

                    },

                    descriptionRu: {

                        label: "Описание (RU)",

                        type: "textarea"

                    },

                    descriptionEn: {

                        label: "Описание (EN)",

                        type: "textarea"

                    },

                    descriptionZh: {

                        label: "Описание (ZH)",

                        type: "textarea"

                    },

                    image: {

                        label: "Изображение",

                        isVisible: {

                            list: true,

                            show: true,

                            edit: false

                        },

                        components: {

                            list: Components.FilePreview,

                            show: Components.FilePreview,

                        },

                    },

                    category: {

                        label: "Категория",

                        reference: "Category",

                    },

                    uploadImage: {

                        label: "Картинка",

                        isVisible: {

                            list: false,

                            show: false,

                            edit: true

                        },

                        components: {

                            edit: Components.ImageUpload,

                        },

                    },

                    categoryId: {

                        isVisible: false

                    },

                },

            },

            features: [

                uploadFeature({

                    componentLoader,

                    provider: {

                        local: {

                            bucket: path.join(process.cwd()),

                        },

                    },

                    properties: {

                        key: "image",

                        file: "uploadImage",

                    },

                    uploadPath: (_, filename) =>
                        `/uploads/images/${Date.now()}-${filename}`,
                }),
            ],
        },
        {
            resource: {
                model: getModelByName("HomepageContent", { Prisma }),
                client: prisma,
            },

            options: {
                navigation: "Мой сайт",

                actions: {
                    new: { isAccessible: false },
                    delete: { isAccessible: false },
                },

                listProperties: [
                    "id",
                    "heroImage",
                    "heroTitleRu",
                    "heroTitleEn",
                    "heroTitleZh",
                    "heroQuoteRu",
                    "heroQuoteEn",
                    "heroQuoteZh",
                ],

                editProperties: [
                    "heroTitleRu",
                    "heroTitleEn",
                    "heroTitleZh",
                    "heroDescriptionRu",
                    "heroDescriptionEn",
                    "heroDescriptionZh",
                    "heroQuoteRu",
                    "heroQuoteEn",
                    "heroQuoteZh",
                    "uploadImage",
                ],

                properties: {
                    heroTitleRu: {
                        label: "Заголовок (RU)",
                    },

                    heroTitleEn: {
                        label: "Заголовок (EN)",
                    },

                    heroTitleZh: {
                        label: "Заголовок (ZH)",
                    },

                    heroDescriptionRu: {
                        label: "Описание (RU)",
                        type: "textarea",
                    },

                    heroDescriptionEn: {
                        label: "Описание (EN)",
                        type: "textarea",
                    },

                    heroDescriptionZh: {
                        label: "Описание (ZH)",
                        type: "textarea",
                    },

                    heroQuoteRu: {
                        label: "Цитата (RU)",
                        type: "textarea",
                    },

                    heroQuoteEn: {
                        label: "Цитата (EN)",
                        type: "textarea",
                    },

                    heroQuoteZh: {
                        label: "Цитата (ZH)",
                        type: "textarea",
                    },

                    heroImage: {

                        isVisible: {

                            list: true,

                            show: true,

                            edit: false,

                        },

                        components: {

                            list: Components.FilePreview,

                            show: Components.FilePreview,

                        },

                    },

                    uploadImage: {
                        label: "Картинка",

                        isVisible: {
                            list: false,
                            show: false,
                            edit: true,
                        },

                        components: {
                            edit: Components.ImageUpload,
                        },
                    },
                },
            },

            features: [
                uploadFeature({
                    componentLoader,

                    provider: {
                        local: {
                            bucket: path.join(process.cwd()),
                        },
                    },

                    properties: {
                        key: "heroImage",
                        file: "uploadImage",
                    },

                    uploadPath: (_, filename) =>
                        `/uploads/images/${Date.now()}-${filename}`,
                }),
            ],
        },
        {
            resource: {
                model: getModelByName("Lead", { Prisma }),
                client: prisma,
            },
            options: {
                label: "Заявки",
                navigation: "Мой сайт",

                actions: {
                    new: { isAccessible: false },
                    edit: { isAccessible: false },
                },

                properties: {
                    id: {
                        isVisible: { list: true, show: true },
                    },

                    name: {
                        label: "Имя",
                    },

                    phone: {
                        label: "Телефон",
                    },

                    comment: {
                        label: "Комментарий",
                        type: "textarea",
                    },

                    createdAt: {
                        label: "Дата",
                    },
                },
            },
        },
    ],
});

admin.watch();

// export const adminRouter = AdminJSExpress.buildRouter(admin);
export const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
        authenticate: async (username, password) => {
            const user = await prisma.admin.findUnique({
                where: { username },
            });

            if (!user) return null;

            const isValid = await bcrypt.compare(password, user.password);

            if (!isValid) return null;

            return {
                id: user.id,
                username: user.username,
            };
        },

        cookieName: "adminjs",
        cookiePassword: "supersecret",
    },
    null,
    {
        resave: false,
        saveUninitialized: true,
        secret: "supersecret",
    }
);

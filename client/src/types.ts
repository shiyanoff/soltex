export type HomepageContent = {
    id: number;
    heroTitleRu: string;
    heroTitleEn: string;
    heroDescriptionRu: string;
    heroDescriptionEn: string;
    heroQuoteRu: string;
    heroQuoteEn: string;
    heroImage: string;
};

export interface ProjectCategory {
    id: number;
    titleRu: string;
    titleEn: string;
}

export interface ProjectItem {
    id: number;
    titleRu: string;
    titleEn: string;
    countryRu: string;
    countryEn: string;
    descriptionRu: string;
    descriptionEn: string;
    projectYear: string;
    image: string;
    categoryId: number;
}

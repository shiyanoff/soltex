/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Settings,
  ShieldCheck,
  Globe,
  MapPin,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Factory,
  BarChart3,
  Cpu,
  Zap,
  Building2,
  X,
  Menu,
  ShieldAlert,
  Server,
  TrendingUp,
  Box,
  Truck,
  Award,
  MessageSquare,
  Upload,
  Trash2,
  Paperclip, Volume2, Expand, VolumeX, Shrink
} from 'lucide-react';
import React, { useRef, useEffect, ReactNode, useState, createContext, useContext } from 'react';
import { IMaskInput } from 'react-imask';
import { translations } from './translations.ts';
import { api } from '../api/axios';
import { HomepageContent, ProjectCategory, ProjectItem } from "@/src/types.ts";

// --- LANGUAGE CONTEXT ---

type Language = 'ru' | 'en' | 'zh';
const LanguageContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
  t: any;
}>({
  lang: 'en',
  setLang: () => {},
  t: translations.en
});

const useTranslation = () => useContext(LanguageContext);

const getLocalized = <T extends Record<string, any>>(
  obj: T,
  field: string,
  lang: Language,
) => {
  const key = `${field}${lang.charAt(0).toUpperCase()}${lang.slice(1)}`;
  return (
    obj[key] ??
    obj[`${field}En`] ??
    obj[`${field}Ru`] ??
    ""
  );
};

// --- SHARED LEAD FORM HOOK ---

const emptyLeadForm = { organization: "", name: "", phone: "", email: "", comment: "" };

const useLeadForm = (onSuccess?: () => void) => {
  const [formData, setFormData] = useState({ ...emptyLeadForm });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handlePhoneAccept = (value: string) => {
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const cleanPhone = `+7 ${formData.phone}`;
      await api.post("/leads", { ...formData, phone: cleanPhone });
      setSuccess(true);
      setFormData({ ...emptyLeadForm });
      setTimeout(() => {
        setSuccess(false);
        onSuccess?.();
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Ошибка отправки");
    } finally {
      setLoading(false);
    }
  };

  return { formData, setFormData, loading, success, handleChange, handlePhoneAccept, handleSubmit };
};

// --- SHARED COMPONENTS ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar = () => {
  const { lang, setLang, t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Handle window resize to close mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { id: 'ru', name: 'РУССКИЙ', code: 'RU' },
    { id: 'en', name: 'ENGLISH', code: 'EN' },
    { id: 'zh', name: '中文', code: 'ZH' }
  ] as const;

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] bg-white/95 backdrop-blur-md border-b border-soltex-border h-16 md:h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src="https://lh3.googleusercontent.com/d/1_y05vcb06n4ENHwISaWWPY8kFv-fe8sW" alt="Soltex" className="h-7 md:h-9 xl:h-10 w-auto" referrerPolicy="no-referrer" />
          </Link>

          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            {[
              { name: t.nav.home, path: '/' },
              { name: t.nav.about, path: '/about' },
              { name: t.nav.tech, path: '/tech' },
              { name: t.nav.services, path: '/services' },
              { name: t.nav.products, path: '/products' },
              { name: t.nav.projects, path: '/projects' },
              { name: t.nav.contact, path: '/contact' }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[8.5px] lg:text-[9.2px] xl:text-[10.2px] font-bold uppercase tracking-wider xl:tracking-widest transition-all duration-200 ${pathname === item.path ? 'text-soltex-red' : 'text-soltex-graphite hover:text-soltex-red'}`}
              >
                {item.name}
              </Link>
            ))}

            <a
              href="https://wa.me/77071881888"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[8.5px] lg:text-[9px] xl:text-[10px] font-bold uppercase tracking-wider xl:tracking-widest text-green-600 hover:text-green-700 transition-all duration-200 border border-green-200 bg-green-50 px-2 py-1 rounded-full whitespace-nowrap ml-1"
            >
              <MessageSquare className="w-3.5 h-3.5 text-green-500" />
              <span>WhatsApp</span>
            </a>

            <div ref={dropdownRef} className="relative border-l border-soltex-border pl-3 xl:pl-6 ml-1.5 xl:ml-3">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1.5 text-[9.5px] xl:text-[10.5px] font-bold uppercase tracking-wider text-soltex-graphite hover:text-soltex-red transition-colors focus:outline-none py-2 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-soltex-red" />
                <span>{languages.find(l => l.id === lang)?.name}</span>
                <ChevronDown className={`w-3 h-3 text-soltex-steel/60 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-56 bg-white border border-soltex-border rounded-xl shadow-2xl overflow-hidden z-[110] py-0.5"
                  >
                    {languages.map((l) => {
                      const isActive = l.id === lang;
                      return (
                        <button
                          key={l.id}
                          onClick={() => {
                            setLang(l.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-5 py-4 text-left font-black transition-colors ${
                            isActive 
                              ? 'bg-soltex-red text-white' 
                              : 'bg-white text-soltex-graphite hover:bg-soltex-light-gray'
                          }`}
                        >
                          <span className="text-xs uppercase tracking-wider">{l.name}</span>
                          <span className={`text-[10px] uppercase font-bold tracking-widest ${
                            isActive ? 'text-white/60' : 'text-soltex-steel/40'
                          }`}>
                            {l.code}
                          </span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            className="lg:hidden text-soltex-graphite p-2 outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-white pt-24 px-6 flex flex-col lg:hidden"
          >
            <div className="flex flex-col space-y-4 max-h-[80vh] overflow-y-auto pr-2 pb-10">
              {[
                { name: t.nav.home, path: '/' },
                { name: t.nav.about, path: '/about' },
                { name: t.nav.tech, path: '/tech' },
                { name: t.nav.services, path: '/services' },
                { name: t.nav.products, path: '/products' },
                { name: t.nav.projects, path: '/projects' },
                { name: t.nav.contact, path: '/contact' }
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-black uppercase tracking-tight text-soltex-graphite hover:text-soltex-red py-1.5 border-b border-soltex-border transition-colors"
                >
                  {item.name}
                </Link>
              ))}

              <a
                href="https://wa.me/77071881888"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-black uppercase text-xs tracking-widest py-3 px-6 rounded-xl transition-all duration-300 mt-4 shadow-lg shadow-green-500/10 active:scale-95"
              >
                <MessageSquare className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="mt-auto mb-10 pt-10 border-t border-soltex-border">
              <div className="flex items-center gap-1 bg-soltex-light-gray p-1 rounded-xl">
                {languages.map((l) => {
                  const isActive = l.id === lang;
                  return (
                    <button
                      key={l.id}
                      onClick={() => setLang(l.id)}
                      className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${
                        isActive 
                          ? 'bg-soltex-red text-white shadow-md' 
                          : 'text-soltex-graphite/60 hover:text-soltex-red hover:bg-soltex-border/5'
                      }`}
                    >
                      {l.code}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-soltex-graphite border-t border-white/5 py-24 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-0">
          <div>
            <div className="flex items-center mb-8 md:mb-10">
              <img
                src="https://lh3.googleusercontent.com/d/1aCbohPSh30YhpRiXKEbBl-YprUMyBALW"
                alt="Soltex"
                className="h-24 md:h-32 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-white/30 text-[10px] max-w-xs uppercase tracking-[0.3em] font-medium ml-1">
              {t.footer.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-10 md:gap-20">
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-soltex-red">{t.footer.sections}</p>
              <ul className="text-sm font-medium space-y-3 text-white/50">
                 <li><Link to="/services" className="hover:text-white transition-colors">{t.nav.services}</Link></li>
                 <li><Link to="/projects" className="hover:text-white transition-colors">{t.nav.projects}</Link></li>
                 <li><Link to="/products" className="hover:text-white transition-colors">{t.nav.products}</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-soltex-red">{t.footer.company}</p>
              <ul className="text-sm font-medium space-y-3 text-white/50">
                 <li><Link to="/about" className="hover:text-white transition-colors">{t.footer.about}</Link></li>
                 <li><Link to="/contact" className="hover:text-white transition-colors">{t.nav.contact}</Link></li>
                 <li><a href="#" className="hover:text-white transition-colors">{t.footer.career}</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-soltex-red">{t.footer.social}</p>
              <ul className="text-sm font-medium space-y-3 text-white/50">
                 <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Telegram</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- LEAD COMMENT BUILDER ---
// Serializes the multi-step questionnaire into a single text blob for the
// existing `comment` field of the /leads endpoint (the backend contract only
// stores organization/name/phone/email/comment, so the extended survey
// answers are folded into `comment` rather than sent as separate fields).
const buildLeadComment = (data: any, initialSubject?: string) => {
  let body = "";
  body += `==================================================\n`;
  body += `SOLTEX TECHNICAL QUESTIONNAIRE SUBMISSION\n`;
  body += `==================================================\n\n`;

  if (initialSubject) {
    body += `Related to: ${initialSubject}\n\n`;
  }

  // Step 1: Project Type
  if (data.projectTypes && data.projectTypes.length > 0) {
    body += `--- STEP 1. PROJECT TYPE & GOALS ---\n`;
    data.projectTypes.forEach((t: string) => {
      body += `- ${t}\n`;
    });
    body += `\n`;
  }

  // Step 2: Target Products
  if (data.products && data.products.length > 0) {
    body += `--- STEP 2. PLANNED PRODUCTS ---\n`;
    data.products.forEach((p: string) => {
      body += `- ${p}\n`;
    });
    body += `\n`;
  }

  // Step 3: Raw Materials
  if (data.rawMaterials && Object.keys(data.rawMaterials).some(k => data.rawMaterials[k])) {
    body += `--- STEP 3. RAW MATERIAL BASE ---\n`;
    Object.entries(data.rawMaterials).forEach(([key, val]) => {
      if (val) body += `  ${key}: ${val}\n`;
    });
    body += `\n`;
  }

  // Step 4: Capacity & Operation
  if (data.capacity && Object.keys(data.capacity).some(k => data.capacity[k])) {
    body += `--- STEP 4. CAPACITY & OPERATIONS ---\n`;
    Object.entries(data.capacity).forEach(([key, val]) => {
      if (val) body += `  ${key}: ${val}\n`;
    });
    body += `\n`;
  }

  // Step 5: Quality Requirements
  if (data.quality && Object.keys(data.quality).some(k => data.quality[k])) {
    body += `--- STEP 5. QUALITY REQUIREMENTS ---\n`;
    Object.entries(data.quality).forEach(([key, val]) => {
      if (val) body += `  ${key}: ${val}\n`;
    });
    body += `\n`;
  }

  // Step 6: Site Info
  if (data.siteInfo && Object.keys(data.siteInfo).some(k => data.siteInfo[k])) {
    body += `--- STEP 6. SITE INFORMATION ---\n`;
    Object.entries(data.siteInfo).forEach(([key, val]) => {
      if (val) body += `  ${key}: ${val}\n`;
    });
    body += `\n`;
  }

  // Step 7: Utilities
  if (data.utilities && Object.keys(data.utilities).some(k => data.utilities[k])) {
    body += `--- STEP 7. UTILITIES & ENGINEERING NETWORKS ---\n`;
    Object.entries(data.utilities).forEach(([key, val]) => {
      if (val) body += `  ${key}: ${val}\n`;
    });
    body += `\n`;
  }

  // Step 8: Soltex Scope
  if (data.soltexScope && data.soltexScope.length > 0) {
    body += `--- STEP 8. SOLTEX REQUIRED SERVICES ---\n`;
    data.soltexScope.forEach((s: string) => {
      body += `- ${s}\n`;
    });
    body += `\n`;
  }

  // Step 9: Equipment Preference
  if (data.equipmentPrefs && data.equipmentPrefs.length > 0) {
    body += `--- STEP 9. EQUIPMENT PREFERENCES ---\n`;
    data.equipmentPrefs.forEach((e: string) => {
      body += `- ${e}\n`;
    });
    body += `\n`;
  }

  // Step 10: Automation
  if (data.automation && data.automation.length > 0) {
    body += `--- STEP 10. AUTOMATION & DIGITALIZATION ---\n`;
    data.automation.forEach((a: string) => {
      body += `- ${a}\n`;
    });
    body += `\n`;
  }

  // Step 11: Environment
  if (data.environment && Object.keys(data.environment).some(k => data.environment[k])) {
    body += `--- STEP 11. ENVIRONMENTAL & PERMITTING REQUIREMENTS ---\n`;
    Object.entries(data.environment).forEach(([key, val]) => {
      if (val) body += `  ${key}: ${val}\n`;
    });
    body += `\n`;
  }

  // Step 12: Logistics
  if (data.logistics && Object.keys(data.logistics).some(k => data.logistics[k])) {
    body += `--- STEP 12. LOGISTICS & INFRASTRUCTURE ---\n`;
    Object.entries(data.logistics).forEach(([key, val]) => {
      if (val) body += `  ${key}: ${val}\n`;
    });
    body += `\n`;
  }

  // Step 13: Packaging
  if (data.packaging && Object.keys(data.packaging).some(k => data.packaging[k])) {
    body += `--- STEP 13. PACKAGING & STORAGE ---\n`;
    Object.entries(data.packaging).forEach(([key, val]) => {
      if (val) body += `  ${key}: ${val}\n`;
    });
    body += `\n`;
  }

  // Step 14: Finance
  if (data.finance && Object.keys(data.finance).some(k => data.finance[k])) {
    body += `--- STEP 14. FINANCIALS & BUDGETS ---\n`;
    Object.entries(data.finance).forEach(([key, val]) => {
      if (val) body += `  ${key}: ${val}\n`;
    });
    body += `\n`;
  }

  // Step 15: Strategic Interview
  if (data.strategic && Object.keys(data.strategic).some(k => data.strategic[k])) {
    body += `--- STEP 15. STRATEGIC INTERVIEW ---\n`;
    Object.entries(data.strategic).forEach(([key, val]) => {
      if (val) body += `Q: ${key}\nA: ${val}\n\n`;
    });
    body += `\n`;
  }

  // Step 16: Required Documents to Attach
  if (data.documents && data.documents.length > 0) {
    body += `--- STEP 16. DOCUMENTS DECLARED ---\n`;
    data.documents.forEach((d: string) => {
      body += `- ${d}\n`;
    });
    body += `\n`;
  }
  if (data.uploadedFiles && data.uploadedFiles.length > 0) {
    body += `Attached Files:\n`;
    data.uploadedFiles.forEach((f: any) => {
      body += `- ${f.name} (${Math.round(f.size / 1024)} KB)\n`;
    });
    body += `\n`;
  }

  // Step 17: Additional Information
  if (data.additional && Object.keys(data.additional).some(k => data.additional[k])) {
    body += `--- STEP 17. ADDITIONAL INFORMATION ---\n`;
    Object.entries(data.additional).forEach(([key, val]) => {
      if (val) body += `  ${key}: ${val}\n`;
    });
    body += `\n`;
  }

  body += `==================================================\n`;
  body += `END OF REPORT\n`;
  body += `==================================================\n`;

  return body;
};

const LeadFormModal = ({ isOpen, onClose, initialSubject = "" }: { isOpen: boolean, onClose: () => void, initialSubject?: string }) => {
  const { lang } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({
    projectTypes: [],
    products: [],
    rawMaterials: {},
    capacity: {},
    quality: {},
    siteInfo: {},
    utilities: {},
    soltexScope: [],
    equipmentPrefs: [],
    automation: [],
    environment: {},
    logistics: {},
    packaging: {},
    finance: {},
    strategic: {},
    documents: [],
    additional: {},
    contacts: { name: "", phone: "", email: "", company: "" }
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!isOpen) return null;

  const steps = [
    {
      title_ru: "Тип и цель проекта",
      title_en: "Project Type and Goals",
      title_zh: "项目类型与目标",
      desc_ru: "Выберите один или несколько вариантов",
      desc_en: "Select one or more options",
      desc_zh: "选择一个或多个选项",
      type: "multichoice",
      id: "projectTypes",
      options: [
        { label_ru: "Новый завод", label_en: "New plant", label_zh: "新工厂" },
        { label_ru: "Расширение действующего производства", label_en: "Expansion of existing production", label_zh: "现有生产线扩产" },
        { label_ru: "Модернизация", label_en: "Modernization", label_zh: "升级改造" },
        { label_ru: "Замена технологии", label_en: "Technology replacement", label_zh: "换代升级" },
        { label_ru: "Технологический аудит", label_en: "Technological audit", label_zh: "工艺技术评估" },
        { label_ru: "ТЭО / Feasibility Study", label_en: "Feasibility Study / PFS", label_zh: "可行性研究设计" },
        { label_ru: "Проектирование", label_en: "Engineering & Design", label_zh: "工程规划与设计" },
        { label_ru: "EPCM / управление проектом", label_en: "EPCM / Project Management", label_zh: "EPCM项目管理" },
        { label_ru: "Поставка оборудования", label_en: "Equipment procurement", label_zh: "核心设备采购" },
        { label_ru: "Пусконаладка", label_en: "Commissioning & Start-up", label_zh: "联合调试与试运行" },
        { label_ru: "Обучение персонала", label_en: "Staff training", label_zh: "员工培训" },
        { label_ru: "Другое", label_en: "Other", label_zh: "其他" }
      ]
    },
    {
      title_ru: "Планируемая продукция",
      title_en: "Planned Products",
      title_zh: "计划投产产品",
      desc_ru: "Выберите планируемую готовую продукцию",
      desc_en: "Select your planned finished products",
      desc_zh: "选择计划生产的成品品类",
      type: "multichoice",
      id: "products",
      options: [
        { label_ru: "Пектин HM", label_en: "HM Pectin", label_zh: "高酯果胶 (HM Pectin)" },
        { label_ru: "Пектин LM", label_en: "LM Pectin", label_zh: "低酯果胶 (LM Pectin)" },
        { label_ru: "MCP-пектин", label_en: "MCP Pectin", label_zh: "改性柑橘果胶 (MCP)" },
        { label_ru: "Пищевые волокна", label_en: "Dietary fibers", label_zh: "膳食纤维" },
        { label_ru: "Изолированный соевый белок", label_en: "Soy Protein Isolate", label_zh: "大豆分离蛋白" },
        { label_ru: "Концентрат соевого белка", label_en: "Soy Protein Concentrate", label_zh: "大豆浓缩蛋白" },
        { label_ru: "Инулин", label_en: "Inulin", label_zh: "药用菊糖 (Inulin)" },
        { label_ru: "Танин", label_en: "Tannin", label_zh: "活性单宁 (Tannin)" },
        { label_ru: "Растительные экстракты", label_en: "Plant extracts", label_zh: "天然植物提取物" },
        { label_ru: "Комплексная переработка", label_en: "Complex processing", label_zh: "农产品综合高值化深加工" },
        { label_ru: "Другое", label_en: "Other", label_zh: "其他" }
      ]
    },
    {
      title_ru: "Сырьевая база",
      title_en: "Raw Material Base",
      title_zh: "原料供应与参数",
      desc_ru: "Заполните известные показатели сырья (все поля необязательны)",
      desc_en: "Fill in known raw material metrics (all fields optional)",
      desc_zh: "填写已知的原料指标 (所有字段均为选填)",
      type: "inputs",
      id: "rawMaterials",
      inputs: [
        { id: "type", label_ru: "Тип сырья", label_en: "Raw material type", label_zh: "原料品类", placeholder_ru: "например, яблочный жом, цитрусовые", placeholder_en: "e.g., apple pomace, citrus peels", placeholder_zh: "例如：苹果渣、柑橘皮" },
        { id: "volume", label_ru: "Годовой объём сырья", label_en: "Annual volume", label_zh: "年原料供应量", unit: "т/год (t/y)" },
        { id: "season_vol", label_ru: "Доступный объём в сезон", label_en: "Volume in season", label_zh: "采收季可供原料量", unit: "т/сезон (t/season)" },
        { id: "seasonality", label_ru: "Сезонность поставки", label_en: "Supply seasonality", label_zh: "采收供应期", placeholder_ru: "например, сентябрь-декабрь", placeholder_en: "e.g., September-December", placeholder_zh: "例如：9月至12月" },
        { id: "moisture", label_ru: "Влажность", label_en: "Moisture content", label_zh: "原料含水率", unit: "%" },
        { id: "dry_matter", label_ru: "Сухие вещества", label_en: "Dry matter", label_zh: "干物质含量", unit: "%" },
        { id: "ph", label_ru: "pH", label_en: "pH", label_zh: "酸碱度 (pH)" },
        { id: "target_content", label_ru: "Содержание целевого компонента", label_en: "Target component content", label_zh: "目标提取物含量", unit: "%" },
        { id: "lab_analysis", label_ru: "Наличие лабораторного анализа", label_en: "Laboratory analysis available", label_zh: "是否有实验室检验报告", placeholder_ru: "да / нет / в процессе", placeholder_en: "yes / no / in progress", placeholder_zh: "是 / 否 / 检测中" },
        { id: "storage", label_ru: "Форма хранения", label_en: "Storage form", label_zh: "储存形式", placeholder_ru: "сухое, силос, замороженное", placeholder_en: "dry, silo, frozen", placeholder_zh: "常温、窖藏、冷冻" },
        { id: "distance", label_ru: "Расстояние от сырья до площадки", label_en: "Distance to site", label_zh: "原料产地至工厂距离", unit: "км (km)" }
      ]
    },
    {
      title_ru: "Производительность и режим работы",
      title_en: "Capacity and Operations",
      title_zh: "生产能力与运行模式",
      desc_ru: "Заполните требования к мощности будущего завода",
      desc_en: "Fill in the capacity requirements for the future plant",
      desc_zh: "填写未来工厂的设计产能与运行要求",
      type: "inputs",
      id: "capacity",
      inputs: [
        { id: "processing", label_ru: "Переработка сырья", label_en: "Raw material processing", label_zh: "日原料处理量", unit: "т/сутки (t/day)" },
        { id: "finished_prod", label_ru: "Готовая продукция", label_en: "Finished product output", label_zh: "年成品产量", unit: "т/год (t/y)" },
        { id: "shifts", label_ru: "Количество смен", label_en: "Number of shifts", label_zh: "日工作班次", unit: "смен/сутки (shifts/day)" },
        { id: "days", label_ru: "Рабочие дни", label_en: "Operating days", label_zh: "年工作天数", unit: "дней/год (days/y)" },
        { id: "hours", label_ru: "Режим работы", label_en: "Operating mode", label_zh: "日运行时数", unit: "ч/сутки (h/day)" },
        { id: "launch_date", label_ru: "Планируемая дата запуска", label_en: "Planned launch date", label_zh: "计划投产日期", placeholder_ru: "например, Q4 2027", placeholder_en: "e.g., Q4 2027", placeholder_zh: "例如：2027年第四季度" }
      ]
    },
    {
      title_ru: "Требования к качеству готовой продукции",
      title_en: "Finished Product Quality",
      title_zh: "成品质量与规格指标",
      desc_ru: "Укажите качественные характеристики целевого продукта",
      desc_en: "Specify the quality parameters of the target product",
      desc_zh: "指定目标成品的物理/化学质量指标",
      type: "inputs",
      id: "quality",
      inputs: [
        { id: "product", label_ru: "Продукт", label_en: "Product type", label_zh: "目标产品", placeholder_ru: "например, Пектин яблочный HM", placeholder_en: "e.g., Apple Pectin HM", placeholder_zh: "例如：苹果高酯果胶" },
        { id: "moisture", label_ru: "Влажность", label_en: "Moisture content", label_zh: "允许含水率", unit: "%" },
        { id: "purity", label_ru: "Чистота", label_en: "Purity", label_zh: "纯度要求", unit: "%" },
        { id: "appearance", label_ru: "Цвет / внешний вид", label_en: "Color / appearance", label_zh: "颜色/外观要求" },
        { id: "solubility", label_ru: "Растворимость", label_en: "Solubility", label_zh: "溶解度" },
        { id: "viscosity", label_ru: "Вязкость / функциональность", label_en: "Viscosity / functionality", label_zh: "粘度/功能性指标" },
        { id: "particle_size", label_ru: "Размер частиц", label_en: "Particle size", label_zh: "粒径要求", unit: "мкм (μm)" },
        { id: "microbiology", label_ru: "Микробиология", label_en: "Microbiology limits", label_zh: "微生物指标限制" },
        { id: "standards", label_ru: "Стандарт / спецификация клиента", label_en: "Standards / client spec", label_zh: "遵循标准/客户规格", placeholder_ru: "например, FCC, USP, EU regulations", placeholder_en: "e.g., FCC, USP, EU regulations", placeholder_zh: "例如：FCC, USP, 欧盟标准" }
      ]
    },
    {
      title_ru: "Информация о площадке",
      title_en: "Site Information",
      title_zh: "建设场地信息",
      desc_ru: "Информация об участке земли под строительство завода",
      desc_en: "Information about the plot for plant construction",
      desc_zh: "用于工厂建设的土地与区位条件",
      type: "inputs",
      id: "siteInfo",
      inputs: [
        { id: "country", label_ru: "Страна и регион", label_en: "Country and region", label_zh: "国家与地区" },
        { id: "address", label_ru: "Адрес площадки", label_en: "Site address", label_zh: "建设地具体地址" },
        { id: "area", label_ru: "Площадь участка", label_en: "Plot area", label_zh: "土地占地面积" },
        { id: "legal_status", label_ru: "Правовой статус участка", label_en: "Legal status of plot", label_zh: "土地使用权性质" },
        { id: "buildings", label_ru: "Наличие существующих зданий", label_en: "Existing buildings", label_zh: "是否有现有厂房" },
        { id: "master_plan", label_ru: "Генеральный план", label_en: "Master plan", label_zh: "厂区总平面图" },
        { id: "topo_survey", label_ru: "Топографическая съёмка", label_en: "Topographic survey", label_zh: "地形测绘图" },
        { id: "geology", label_ru: "Геология", label_en: "Geotechnical study", label_zh: "工程地质勘察报告" },
        { id: "seismicity", label_ru: "Сейсмичность региона", label_en: "Regional seismicity", label_zh: "地区抗震设防烈度" },
        { id: "climate", label_ru: "Климатические условия", label_en: "Climatic conditions", label_zh: "气象与气候条件" },
        { id: "sanitary_zones", label_ru: "Ограничения по санитарным зонам", label_en: "Sanitary zone restrictions", label_zh: "卫生防护距离限制" }
      ]
    },
    {
      title_ru: "Инженерные сети",
      title_en: "Utilities & Engineering Networks",
      title_zh: "公用工程与公用管网",
      desc_ru: "Доступные лимиты энергоресурсов на площадке",
      desc_en: "Available resource limits at the construction site",
      desc_zh: "建设现场可用的公用工程供应配额",
      type: "inputs",
      id: "utilities",
      inputs: [
        { id: "electricity", label_ru: "Электроэнергия — доступная мощность", label_en: "Electricity — available power", label_zh: "电力 - 变电可用容量", unit: "кВт/МВт (kW/MW)" },
        { id: "voltage", label_ru: "Напряжение", label_en: "Voltage", label_zh: "供电电压", unit: "кВ (kV)" },
        { id: "gas_pressure", label_ru: "Газ — давление", label_en: "Gas — pressure", label_zh: "天然气 - 管道压力", unit: "бар (bar)" },
        { id: "gas_flow", label_ru: "Газ — доступный расход", label_en: "Gas — available flow rate", label_zh: "天然气 - 供应流量", unit: "м3/ч (m³/h)" },
        { id: "steam", label_ru: "Пар", label_en: "Steam", label_zh: "蒸汽量", unit: "т/ч (t/h)" },
        { id: "water_source", label_ru: "Вода — источник", label_en: "Water — source", label_zh: "水源来源" },
        { id: "water_flow", label_ru: "Вода — доступный объём", label_en: "Water — available volume", label_zh: "每日可用水量", unit: "м3/сутки (m³/day)" },
        { id: "water_quality", label_ru: "Вода — качество/анализ", label_en: "Water — quality/analysis", label_zh: "水质检测报告" },
        { id: "compressed_air", label_ru: "Сжатый воздух", label_en: "Compressed air", label_zh: "压缩空气流量", unit: "м3/мин (m³/min)" },
        { id: "cooling", label_ru: "Холод/чиллер", label_en: "Cooling/chiller capacity", label_zh: "工业冷水制冷量", unit: "кВт (kW)" },
        { id: "sewage", label_ru: "Канализация/стоки", label_en: "Sewage/drainage", label_zh: "污水排放系统容量", unit: "м3/сутки (m³/day)" },
        { id: "wwtp", label_ru: "Очистные сооружения (есть/нет)", label_en: "Wastewater treatment (yes/no)", label_zh: "是否/有污水处理设施" }
      ]
    },
    {
      title_ru: "Требуемый объём услуг Soltex",
      title_en: "Required Volume of Soltex Services",
      title_zh: "所需的 Soltex 服务范围",
      desc_ru: "Какие этапы проекта вы планируете поручить нам?",
      desc_en: "Which project phases do you plan to delegate to us?",
      desc_zh: "您计划将项目的哪些阶段委托给我们？",
      type: "multichoice",
      id: "soltexScope",
      options: [
        { label_ru: "Разработка ТЗ", label_en: "Technical Specification development", label_zh: "技术任务书 (ТЗ) 编写" },
        { label_ru: "Концепция проекта", label_en: "Project Concept design", label_zh: "项目初步概念设计" },
        { label_ru: "Предварительное ТЭО", label_en: "Pre-Feasibility Study (PFS)", label_zh: "初步可行性研究 (PFS)" },
        { label_ru: "Basic Engineering", label_en: "Basic Engineering (FEED)", label_zh: "基础工艺设计 (Basic Engineering)" },
        { label_ru: "Detailed Engineering", label_en: "Detailed Engineering", label_zh: "施工图详细设计 (Detailed Engineering)" },
        { label_ru: "Технологический регламент", label_en: "Technology Regulations", label_zh: "工艺技术规程编制" },
        { label_ru: "Подбор оборудования", label_en: "Equipment selection", label_zh: "核心设备选型与配套" },
        { label_ru: "Закупки/Procurement", label_en: "Procurement services", label_zh: "设备采购代理" },
        { label_ru: "Construction Management", label_en: "Construction Management", label_zh: "施工现场技术管理" },
        { label_ru: "EPCM", label_en: "EPCM services", label_zh: "EPCM全周期总承包管理" },
        { label_ru: "EPC", label_en: "EPC turnkey", label_zh: "EPC交钥匙总承包" },
        { label_ru: "Пусконаладка", label_en: "Commissioning & Start-up", label_zh: "现场安装指导与调试" },
        { label_ru: "Выход на проектную мощность", label_en: "Reaching design capacity", label_zh: "协助达产达标" },
        { label_ru: "Обучение персонала", label_en: "Operators training", label_zh: "技术与操作人员培训" },
        { label_ru: "Сервисная поддержка", label_en: "After-sales support", label_zh: "售后技术升级" },
        { label_ru: "Трансфер технологии", label_en: "Technology transfer", label_zh: "技术转让与工艺包交付" }
      ]
    },
    {
      title_ru: "Предпочтения по оборудованию",
      title_en: "Equipment Preferences",
      title_zh: "设备配置偏好",
      desc_ru: "Ваши технологические и экономические ориентиры",
      desc_en: "Your technological and economic guidelines",
      desc_zh: "您对核心设备技术水平及预算配比的要求",
      type: "multichoice",
      id: "equipmentPrefs",
      options: [
        { label_ru: "Европейское оборудование", label_en: "European equipment", label_zh: "欧洲品牌进口设备" },
        { label_ru: "Китайское оборудование", label_en: "Chinese equipment", label_zh: "中国品牌设备" },
        { label_ru: "Смешанная комплектация", label_en: "Hybrid configuration", label_zh: "混合配置 (欧洲核心+中国配套)" },
        { label_ru: "GEA", label_en: "GEA", label_zh: "德国 GEA" },
        { label_ru: "Alfa Laval", label_en: "Alfa Laval", label_zh: "瑞典 阿法拉伐" },
        { label_ru: "Andritz", label_en: "Andritz", label_zh: "奥地利 安德里茨" },
        { label_ru: "Bühler", label_en: "Bühler", label_zh: "瑞士 布勒" },
        { label_ru: "Tetra Pak", label_en: "Tetra Pak", label_zh: "利乐 (Tetra Pak)" },
        { label_ru: "Локальные производители", label_en: "Local manufacturers", label_zh: "本地设备制造商" },
        { label_ru: "Нет предпочтений", label_en: "No preferences", label_zh: "无特定偏好" },
        { label_ru: "Минимальный CAPEX", label_en: "Minimum CAPEX", label_zh: "最低投资成本优先" },
        { label_ru: "Максимальная надёжность", label_en: "Maximum reliability", label_zh: "最高技术可靠性优先" }
      ]
    },
    {
      title_ru: "Автоматизация и цифровизация",
      title_en: "Automation and Digitalization",
      title_zh: "自动控制与数智化水平",
      desc_ru: "Желаемый уровень технологического контроля",
      desc_en: "Desired level of process control & digitalization",
      desc_zh: "您期望的工艺过程自动化与智能化控制水平",
      type: "multichoice",
      id: "automation",
      options: [
        { label_ru: "Ручное управление", label_en: "Manual control", label_zh: "人工手动操作" },
        { label_ru: "Полуавтоматический режим", label_en: "Semi-automated", label_zh: "半自动化运行" },
        { label_ru: "Полная автоматизация", label_en: "Full automation", label_zh: "全自动智能控制" },
        { label_ru: "PLC", label_en: "PLC Control Systems", label_zh: "PLC控制系统 (西门子等)" },
        { label_ru: "SCADA", label_en: "SCADA Systems", label_zh: "SCADA中央控制与监视" },
        { label_ru: "MES", label_en: "MES Execution Systems", label_zh: "MES生产制造执行系统" },
        { label_ru: "ERP-интеграция", label_en: "ERP integration", label_zh: "与企业ERP系统对接" },
        { label_ru: "Удалённый мониторинг", label_en: "Remote monitoring", label_zh: "远程专家诊断与数据监测" },
        { label_ru: "Лабораторная система контроля качества", label_en: "Laboratory Quality System", label_zh: "实验室LIMS管理系统" },
        { label_ru: "CIP/SIP", label_en: "CIP/SIP cleaning", label_zh: "CIP/SIP全自动在位清洗" }
      ]
    },
    {
      title_ru: "Экология, разрешения и нормативы",
      title_en: "Ecology, Permits and Regulations",
      title_zh: "环保、许可与政策法规",
      desc_ru: "Ограничения и требования со стороны госорганов",
      desc_en: "Constraints and compliance requirements from state bodies",
      desc_zh: "所在国政府及行业主管部门的合规性要求",
      type: "inputs",
      id: "environment",
      inputs: [
        { id: "regulations", label_ru: "Экологические требования страны проекта", label_en: "Environmental reqs of country", label_zh: "所在国环保技术规范与法规要求" },
        { id: "permits", label_ru: "Требуемые разрешения", label_en: "Permits required", label_zh: "项目建设需办理的政府许可" },
        { id: "emissions", label_ru: "Ограничения по выбросам", label_en: "Air emission limits", label_zh: "工业废气排放标准" },
        { id: "wastewater", label_ru: "Ограничения по сточным водам", label_en: "Wastewater limits", label_zh: "工业污水排放限制" },
        { id: "waste", label_ru: "Требования к отходам", label_en: "Solid waste requirements", label_zh: "固体废弃物处置要求" },
        { id: "esg", label_ru: "ESG / Green Technology требования", label_en: "ESG / Green Tech compliance", label_zh: "ESG及绿色/低碳工厂要求" },
        { id: "permitting_help", label_ru: "Нужна ли помощь с разрешениями", label_en: "Permitting assistance needed?", label_zh: "是否需要协助办理审批" }
      ]
    },
    {
      title_ru: "Логистика и инфраструктура",
      title_en: "Logistics and Infrastructure",
      title_zh: "物流配套与厂外基础设施",
      desc_ru: "Близость транспортных путей и складские условия",
      desc_en: "Proximity to transport corridors and storage conditions",
      desc_zh: "外部物流动脉条件与厂内原料/成品仓储规划",
      type: "inputs",
      id: "logistics",
      inputs: [
        { id: "road", label_ru: "Ближайшая автодорога", label_en: "Nearest highway", label_zh: "最近的公路货运干线" },
        { id: "railway", label_ru: "Ж/д ветка", label_en: "Railway spur", label_zh: "厂区是否通铁路专用线" },
        { id: "port", label_ru: "Порт/сухой порт", label_en: "Sea/Dry port", label_zh: "临近海港/陆港" },
        { id: "terminal", label_ru: "Контейнерный терминал", label_en: "Container terminal", label_zh: "临近集装箱物流枢纽" },
        { id: "airport", label_ru: "Расстояние до аэропорта", label_en: "Distance to airport", label_zh: "距最近机场距离" },
        { id: "warehouses", label_ru: "Складские площади", label_en: "Warehouse areas", label_zh: "规划仓库面积" },
        { id: "raw_storage", label_ru: "Условия хранения сырья", label_en: "Raw storage conditions", label_zh: "原料储存技术条件" },
        { id: "product_storage", label_ru: "Условия хранения готовой продукции", label_en: "Product storage conditions", label_zh: "成品储存技术条件" }
      ]
    },
    {
      title_ru: "Упаковка и хранение готовой продукции",
      title_en: "Packaging and Storage of Finished Product",
      title_zh: "成品包装与物流发运",
      desc_ru: "Параметры фасовки и дистрибуции готового продукта",
      desc_en: "Packaging and distribution parameters of finished product",
      desc_zh: "成品包装规格、目标货架寿命与销路方向",
      type: "inputs",
      id: "packaging",
      inputs: [
        { id: "type", label_ru: "Тип упаковки", label_en: "Packaging type", label_zh: "包装形式" },
        { id: "weight", label_ru: "Вес единицы упаковки", label_en: "Unit weight", label_zh: "单袋/单桶净重" },
        { id: "labeling", label_ru: "Требования к маркировке", label_en: "Labeling requirements", label_zh: "标签/打码特殊要求" },
        { id: "shelf_life", label_ru: "Срок хранения", label_en: "Shelf life", label_zh: "质保期限" },
        { id: "storage_cond", label_ru: "Условия хранения", label_en: "Storage conditions", label_zh: "推荐仓储温湿度环境" },
        { id: "shipment", label_ru: "Планируемая отгрузка", label_en: "Planned shipment", label_zh: "计划物流发运方式" },
        { id: "target_markets", label_ru: "Целевые рынки сбыта", label_en: "Target markets", label_zh: "核心目标销路与销售市场" }
      ]
    },
    {
      title_ru: "Финансы и коммерческие ожидания",
      title_en: "Finance and Commercial Expectations",
      title_zh: "商业指标与投资预算",
      desc_ru: "Бюджетирование и критерии оценки подрядчиков",
      desc_en: "Budgeting and contractor selection criteria",
      desc_zh: "预计总投资额、资金筹措方式及承包商考量标准",
      type: "inputs",
      id: "finance",
      inputs: [
        { id: "budget", label_ru: "Ориентировочный budget проекта", label_en: "Project budget estimate", label_zh: "预计项目总投资预算" },
        { id: "source", label_ru: "Источник финансирования", label_en: "Funding source", label_zh: "资金来源" },
        { id: "approved", label_ru: "Наличие одобренного финансирования", label_en: "Approved financing available?", label_zh: "是否已有获批的资金" },
        { id: "fundraising_help", label_ru: "Требуется ли помощь в привлечении финансирования", label_en: "Assistance in fundraising needed?", label_zh: "是否需要协助引入融资" },
        { id: "payback", label_ru: "Желаемый срок окупаемости", label_en: "Desired payback period", label_zh: "期望投资回收期 (年)" },
        { id: "ebitda", label_ru: "Ожидаемая EBITDA", label_en: "Expected EBITDA", label_zh: "预期年EBITDA利润率" },
        { id: "selection_criteria", label_ru: "Ключевой критерий выбора подрядчика", label_en: "Key contractor selection criterion", label_zh: "选择承包商的核心标准" },
        { id: "alternatives", label_ru: "Наличие альтернативных предложений", label_en: "Alternative proposals available?", label_zh: "是否已有其他提案" }
      ]
    },
    {
      title_ru: "Стратегическое интервью",
      title_en: "Strategic Interview",
      title_zh: "战略访谈与投资背景",
      desc_ru: "Вопросы о стратегическом видении проекта",
      desc_en: "Questions on the strategic vision of the project",
      desc_zh: "了解启动该项目的战略意图与愿景",
      type: "textareas",
      id: "strategic",
      inputs: [
        { id: "why_now", label_ru: "Почему проект планируется реализовать именно сейчас?", label_en: "Why implement this project now?", label_zh: "为什么选择在当前节点启动本项目？" },
        { id: "main_problem", label_ru: "Какую главную проблему должен решить проект?", label_en: "What main problem should it solve?", label_zh: "本项目旨在解决企业当前的什么核心痛点？" },
        { id: "success_criteria", label_ru: "Что является главным критерием успеха (CAPEX, срок запуска, качество, прибыльность, надёжность)?", label_en: "What is the key success criterion?", label_zh: "项目成功的首要决定性要素是什么？" },
        { id: "decision_maker", label_ru: "Кто принимает окончательное инвестиционное решение?", label_en: "Who makes the final decision?", label_zh: "谁是最终投资决策审批人？" },
        { id: "other_offers", label_ru: "Есть ли предложения от других поставщиков технологий или EPC-подрядчиков?", label_en: "Are there other active proposals?", label_zh: "目前是否有其他技术方案或承包商竞争？" },
        { id: "three_factors", label_ru: "Какие три фактора будут решающими при выборе партнёра?", label_en: "What 3 factors will be decisive?", label_zh: "评估与选择技术合作伙伴的三个最关键考量维度？" },
        { id: "scaling", label_ru: "Планируется ли масштабирование или строительство нескольких заводов?", label_en: "Is future scaling planned?", label_zh: "后续是否有二期扩产或跨地区复制建厂战略？" },
        { id: "partnership_type", label_ru: "Рассматривается ли долгосрочное технологическое партнёрство, лицензия или роялти?", label_en: "Is licensing / royalty considered?", label_zh: "是否考虑长期的技术合作、专利授权或分红？" }
      ]
    },
    {
      title_ru: "Документы и файлы",
      title_en: "Documents and Files",
      title_zh: "参考文档与资料附件",
      desc_ru: "Выберите, какие документы у вас имеются, и приложите их",
      desc_en: "Select which documents you have and upload them",
      desc_zh: "选择您现有的工程与商业资料并上传附件",
      type: "file",
      id: "documents",
      options: [
        { label_ru: "Анализ сырья", label_en: "Raw material analysis", label_zh: "原料组分分析报告" },
        { label_ru: "Фото сырья", label_en: "Raw material photo", label_zh: "原料实拍照片" },
        { label_ru: "План участка", label_en: "Plot plan", label_zh: "土地红线图" },
        { label_ru: "Генеральный план", label_en: "Master plan", label_zh: "现有厂区总图" },
        { label_ru: "Геология", label_en: "Geotechnical report", label_zh: "地质勘察报告" },
        { label_ru: "Топография", label_en: "Topographic survey", label_zh: "地形测量图" },
        { label_ru: "Технические условия на сети", label_en: "Grid connection conditions", label_zh: "公用管网技术条件" },
        { label_ru: "Фото площадки", label_en: "Site photos", label_zh: "厂区现状实拍" },
        { label_ru: "Климатические данные", label_en: "Climatic data", label_zh: "建设区气象参数" },
        { label_ru: "Экологические ограничения", label_en: "Environmental restrictions", label_zh: "环保排放限制文件" },
        { label_ru: "Производственная программа", label_en: "Production program", label_zh: "设计年产大纲" },
        { label_ru: "Бизнес-план", label_en: "Business plan", label_zh: "商业计划书/可行性研究" },
        { label_ru: "Предыдущие КП", label_en: "Previous proposals", label_zh: "其他设备商报价方案" },
        { label_ru: "Другое", label_en: "Other", label_zh: "其他" }
      ]
    },
    {
      title_ru: "Дополнительная информация",
      title_en: "Additional Information",
      title_zh: "补充说明与备注",
      desc_ru: "Ваши дополнительные комментарии к проекту",
      desc_en: "Your additional project comments",
      desc_zh: "请填写您认为对本项目具有参考意义的其他任何补充背景",
      type: "inputs",
      id: "additional",
      inputs: [
        { id: "reqs", label_ru: "Дополнительные требования заказчика", label_en: "Additional client requirements", label_zh: "客户补充技术与商务要求", type: "textarea" },
        { id: "timeline", label_ru: "Комментарии по срокам", label_en: "Comments on timeline", label_zh: "期望工期/时间节点说明", type: "textarea" },
        { id: "budget_comm", label_ru: "Комментарии по бюджету", label_en: "Comments on budget", label_zh: "投资成本/限额预算说明", type: "textarea" },
        { id: "risks", label_ru: "Риски или ограничения проекта", label_en: "Project risks or constraints", label_zh: "潜在的项目风险/客观限制", type: "textarea" },
        { id: "other_info", label_ru: "Иная важная информация", label_en: "Other important info", label_zh: "其他需补充的重要参考背景", type: "textarea" }
      ]
    },
    {
      title_ru: "Контактная информация",
      title_en: "Contact Information",
      title_zh: "联系人与联络方式",
      desc_ru: "Пожалуйста, введите ваши контактные данные. Поля со звездочкой обязательны.",
      desc_en: "Please enter your contact details. Fields marked with an asterisk are required.",
      desc_zh: "请填写您的真实联络信息以便后续为您建立专项工程小组。带 * 的为必填项。",
      type: "contacts",
      id: "contacts"
    }
  ];

  const currentStepConfig = steps[currentStep];
  const totalSteps = steps.length;
  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Selection toggle for multiple choices
  const toggleSelection = (stepId: string, itemValue: string) => {
    setFormData((prev: any) => {
      const currentList = prev[stepId] || [];
      const updatedList = currentList.includes(itemValue)
        ? currentList.filter((x: string) => x !== itemValue)
        : [...currentList, itemValue];
      return { ...prev, [stepId]: updatedList };
    });
  };

  // Text changes for generic inputs
  const handleInputChange = (stepId: string, fieldId: string, value: string) => {
    setFormData((prev: any) => {
      const sectionData = prev[stepId] || {};
      return {
        ...prev,
        [stepId]: {
          ...sectionData,
          [fieldId]: value
        }
      };
    });
  };

  // Contact details changes
  const handleContactChange = (fieldId: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      contacts: {
        ...prev.contacts,
        [fieldId]: value
      }
    }));
  };

  // Drag and drop mechanics
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const removeUploadedFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate final required contact fields
    if (!formData.contacts.name || !formData.contacts.phone) {
      alert(lang === 'ru' ? "Пожалуйста, заполните обязательные поля: Имя и Телефон!" : "Please fill in the required fields: Name and Phone!");
      return;
    }

    setIsSubmitting(true);

    const clientData = {
      ...formData,
      uploadedFiles: uploadedFiles.map(f => ({ name: f.name, size: f.size }))
    };

    try {
      const cleanPhone = `+7 ${formData.contacts.phone}`;
      await api.post("/leads", {
        organization: formData.contacts.company,
        name: formData.contacts.name,
        phone: cleanPhone,
        email: formData.contacts.email,
        comment: buildLeadComment(clientData, initialSubject),
      });
      setSubmitSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Ошибка отправки");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helpers to get localized string from steps
  const getStepTitle = (step: any) => {
    if (lang === 'ru') return step.title_ru;
    if (lang === 'zh') return step.title_zh;
    return step.title_en;
  };

  const getStepDesc = (step: any) => {
    if (lang === 'ru') return step.desc_ru;
    if (lang === 'zh') return step.desc_zh;
    return step.desc_en;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-soltex-graphite/90 backdrop-blur-sm"
        />

        {/* Modal card wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-white w-full max-w-2xl shadow-2xl border border-soltex-border overflow-hidden rounded-3xl flex flex-col max-h-[92vh] z-20"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-soltex-graphite/60 hover:text-soltex-red transition-colors outline-none z-30"
            aria-label="Close survey"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Progress header */}
          <div className="border-b border-soltex-border/50 bg-soltex-light-gray/40 px-6 py-4 md:px-8">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-soltex-steel mb-2">
              <span>SOLTEX TECHNICAL QUESTIONNAIRE</span>
              <span className="text-soltex-red">
                {lang === 'ru' ? `Шаг ${currentStep + 1} из ${totalSteps}` : lang === 'zh' ? `第 ${currentStep + 1} / ${totalSteps} 步` : `Step ${currentStep + 1} of ${totalSteps}`}
              </span>
            </div>
            <div className="w-full bg-soltex-border/50 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-soltex-red h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Form Scrollable Body */}
          <div className="p-6 md:p-8 overflow-y-auto flex-1">
            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 px-4 space-y-6 flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-soltex-graphite leading-none">
                  {lang === 'ru' ? 'Заявка успешно отправлена!' : lang === 'zh' ? '申请提交成功！' : 'Request Submitted Successfully!'}
                </h3>
                <p className="text-sm text-soltex-steel max-w-md mx-auto leading-relaxed font-semibold">
                  {lang === 'ru'
                    ? 'Ваши технические данные переданы в инженерный отдел Soltex. Мы детально проанализируем опросный лист и свяжемся с вами в течение 24 часов для обсуждения коммерческого предложения.'
                    : lang === 'zh'
                    ? '您的项目工程数据已安全传输至 Soltex 专家组。我们将在 24 小时内为您完成可行性初筛并联系您。'
                    : 'Your technical requirements have been securely transmitted to the Soltex Engineering Group. We will review the parameters and contact you within 24 hours to discuss the project.'
                  }
                </p>
                <button
                  onClick={onClose}
                  className="bg-soltex-red hover:bg-soltex-graphite text-white font-black uppercase text-xs tracking-widest py-3 px-8 rounded-xl transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  {lang === 'ru' ? 'Закрыть' : lang === 'zh' ? '关闭' : 'Close'}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-soltex-graphite mb-1.5">
                    {getStepTitle(currentStepConfig)}
                  </h2>
                  <p className="text-xs text-soltex-steel font-semibold">
                    {getStepDesc(currentStepConfig)}
                  </p>
                </div>

                {/* --- Step Contents based on type --- */}

                {/* Multichoice items */}
                {currentStepConfig.type === "multichoice" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {currentStepConfig.options?.map((opt: any) => {
                      const selectedList = formData[currentStepConfig.id] || [];
                      const isSelected = selectedList.includes(lang === 'ru' ? opt.label_ru : lang === 'zh' ? opt.label_zh : opt.label_en);
                      const optLabel = lang === 'ru' ? opt.label_ru : lang === 'zh' ? opt.label_zh : opt.label_en;
                      return (
                        <button
                          key={optLabel}
                          type="button"
                          onClick={() => toggleSelection(currentStepConfig.id, optLabel)}
                          className={`text-left px-4 py-3.5 border rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-between cursor-pointer ${
                            isSelected 
                              ? 'bg-soltex-red border-soltex-red text-white shadow-md' 
                              : 'bg-soltex-light-gray/40 hover:bg-soltex-light-gray/80 border-soltex-border text-soltex-graphite'
                          }`}
                        >
                          <span>{optLabel}</span>
                          <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                            isSelected ? 'bg-white border-white text-soltex-red' : 'border-soltex-steel/40'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-soltex-red" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Generic text/numeric inputs */}
                {currentStepConfig.type === "inputs" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {currentStepConfig.inputs?.map((inp: any) => {
                      const sectionValue = formData[currentStepConfig.id] || {};
                      const value = sectionValue[inp.id] || "";
                      const localizedLabel = lang === 'ru' ? inp.label_ru : lang === 'zh' ? inp.label_zh : inp.label_en;
                      const placeholder = lang === 'ru' ? inp.placeholder_ru : lang === 'zh' ? inp.placeholder_zh : inp.placeholder_en;

                      return (
                        <div key={inp.id} className="space-y-1 sm:col-span-1">
                          <label className="text-[10px] font-black text-soltex-graphite uppercase tracking-wider block">
                            {localizedLabel} {inp.unit && <span className="text-soltex-red">({inp.unit})</span>}
                          </label>
                          {inp.type === "textarea" ? (
                            <textarea
                              value={value}
                              onChange={(e) => handleInputChange(currentStepConfig.id, inp.id, e.target.value)}
                              placeholder={placeholder || (lang === 'ru' ? 'Введите информацию...' : 'Enter details...')}
                              className="w-full bg-soltex-light-gray/20 border border-soltex-border px-4 py-3 outline-none focus:border-soltex-red transition-all rounded-xl text-xs font-semibold text-soltex-graphite h-20 resize-none"
                            />
                          ) : (
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => handleInputChange(currentStepConfig.id, inp.id, e.target.value)}
                              placeholder={placeholder || (lang === 'ru' ? 'Будет уточнено / Empty' : 'To be confirmed / Empty')}
                              className="w-full bg-soltex-light-gray/20 border border-soltex-border px-4 py-2.5 outline-none focus:border-soltex-red transition-all rounded-xl text-xs font-semibold text-soltex-graphite"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Strategic / interview Textareas */}
                {currentStepConfig.type === "textareas" && (
                  <div className="space-y-4 pt-2">
                    {currentStepConfig.inputs?.map((inp: any) => {
                      const sectionValue = formData[currentStepConfig.id] || {};
                      const value = sectionValue[inp.id] || "";
                      const localizedLabel = lang === 'ru' ? inp.label_ru : lang === 'zh' ? inp.label_zh : inp.label_en;

                      return (
                        <div key={inp.id} className="space-y-1">
                          <label className="text-[10px] font-black text-soltex-graphite uppercase tracking-wider block leading-snug">
                            {localizedLabel}
                          </label>
                          <textarea
                            value={value}
                            onChange={(e) => handleInputChange(currentStepConfig.id, inp.id, e.target.value)}
                            placeholder={lang === 'ru' ? 'Ваш развернутый ответ...' : lang === 'zh' ? '请填写您的详细描述...' : 'Your detailed answer...'}
                            className="w-full bg-soltex-light-gray/20 border border-soltex-border px-4 py-3 outline-none focus:border-soltex-red transition-all rounded-xl text-xs font-semibold text-soltex-graphite h-20 resize-none"
                          />
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Documents checkboxes + File upload zone */}
                {currentStepConfig.type === "file" && (
                  <div className="space-y-6 pt-2">
                    {/* Multichoice documentation keys */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentStepConfig.options?.map((opt: any) => {
                        const selectedList = formData[currentStepConfig.id] || [];
                        const isSelected = selectedList.includes(lang === 'ru' ? opt.label_ru : lang === 'zh' ? opt.label_zh : opt.label_en);
                        const optLabel = lang === 'ru' ? opt.label_ru : lang === 'zh' ? opt.label_zh : opt.label_en;
                        return (
                          <button
                            key={optLabel}
                            type="button"
                            onClick={() => toggleSelection(currentStepConfig.id, optLabel)}
                            className={`text-left px-3.5 py-2.5 border rounded-lg text-[11px] font-bold uppercase transition-all flex items-center justify-between cursor-pointer ${
                              isSelected 
                                ? 'bg-soltex-graphite border-soltex-graphite text-white' 
                                : 'bg-soltex-light-gray/30 hover:bg-soltex-light-gray/60 border-soltex-border text-soltex-graphite'
                            }`}
                          >
                            <span>{optLabel}</span>
                            <span className={`w-3 h-3 rounded-md border flex items-center justify-center shrink-0 ml-2 ${
                              isSelected ? 'bg-soltex-red border-soltex-red text-white' : 'border-soltex-steel/30'
                            }`}>
                              {isSelected && <ShieldCheck className="w-2.5 h-2.5 text-white" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Drag and Drop Box */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-soltex-graphite uppercase tracking-wider block">
                        {lang === 'ru' ? 'Загрузить сопутствующие файлы' : lang === 'zh' ? '上传参考资料/设计附件' : 'Upload Accompanying Files'}
                      </label>
                      <div
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                          dragActive 
                            ? 'border-soltex-red bg-soltex-red/5' 
                            : 'border-soltex-border hover:border-soltex-red bg-soltex-light-gray/10'
                        }`}
                      >
                        <input
                          type="file"
                          id="survey-files"
                          multiple
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="survey-files"
                          className="cursor-pointer flex flex-col items-center justify-center space-y-2 text-soltex-steel"
                        >
                          <Upload className="w-8 h-8 text-soltex-red" />
                          <span className="text-xs font-bold text-soltex-graphite">
                            {lang === 'ru' ? 'Перетащите файлы сюда или нажмите для выбора' : lang === 'zh' ? '拖拽附件至此或点击上传' : 'Drag & drop files here or click to select'}
                          </span>
                          <span className="text-[10px] font-bold text-soltex-steel/60">
                            PDF, Word, Excel, CAD, JPG, PNG (Max 50MB)
                          </span>
                        </label>
                      </div>

                      {/* File preview table */}
                      {uploadedFiles.length > 0 && (
                        <div className="space-y-2 bg-soltex-light-gray/30 p-3 rounded-xl max-h-36 overflow-y-auto">
                          {uploadedFiles.map((f, i) => (
                            <div key={i} className="flex items-center justify-between text-xs font-semibold bg-white px-3 py-1.5 rounded-lg border border-soltex-border">
                              <div className="flex items-center gap-2 text-soltex-graphite truncate pr-4">
                                <Paperclip className="w-3.5 h-3.5 text-soltex-red shrink-0" />
                                <span className="truncate">{f.name}</span>
                                <span className="text-[10px] text-soltex-steel">({Math.round(f.size / 1024)} KB)</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeUploadedFile(i)}
                                className="text-soltex-steel hover:text-soltex-red transition-colors shrink-0"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Final step - contacts page */}
                {currentStepConfig.type === "contacts" && (
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-soltex-graphite uppercase tracking-wider block">
                          {lang === 'ru' ? 'Имя / Контактное лицо *' : lang === 'zh' ? '联系人姓名 *' : 'Contact Person / Name *'}
                        </label>
                        <input
                          type="text"
                          value={formData.contacts.name}
                          onChange={(e) => handleContactChange('name', e.target.value)}
                          placeholder={lang === 'ru' ? 'Александр...' : 'e.g., Alexander...'}
                          className="w-full bg-soltex-light-gray/20 border border-soltex-border px-4 py-2.5 outline-none focus:border-soltex-red transition-all rounded-xl text-xs font-semibold text-soltex-graphite"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-soltex-graphite uppercase tracking-wider block">
                          {lang === 'ru' ? 'Телефон / WhatsApp *' : lang === 'zh' ? '联络电话 / WhatsApp *' : 'Phone / WhatsApp *'}
                        </label>
                        <IMaskInput
                          mask="+{7} (000) 000-00-00"
                          placeholder="+7 (___) ___-__-__"
                          value={formData.contacts.phone}
                          unmask={false}
                          onAccept={(value: string) => handleContactChange('phone', value)}
                          className="w-full bg-soltex-light-gray/20 border border-soltex-border px-4 py-2.5 outline-none focus:border-soltex-red transition-all rounded-xl text-xs font-semibold text-soltex-graphite"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-soltex-graphite uppercase tracking-wider block">
                          Email (Optional)
                        </label>
                        <input
                          type="email"
                          value={formData.contacts.email}
                          onChange={(e) => handleContactChange('email', e.target.value)}
                          placeholder="client@mail.com"
                          className="w-full bg-soltex-light-gray/20 border border-soltex-border px-4 py-2.5 outline-none focus:border-soltex-red transition-all rounded-xl text-xs font-semibold text-soltex-graphite"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-soltex-graphite uppercase tracking-wider block">
                          {lang === 'ru' ? 'Компания (Опционально)' : lang === 'zh' ? '公司名称 (选填)' : 'Company (Optional)'}
                        </label>
                        <input
                          type="text"
                          value={formData.contacts.company}
                          onChange={(e) => handleContactChange('company', e.target.value)}
                          placeholder="Soltex Inc."
                          className="w-full bg-soltex-light-gray/20 border border-soltex-border px-4 py-2.5 outline-none focus:border-soltex-red transition-all rounded-xl text-xs font-semibold text-soltex-graphite"
                        />
                      </div>
                    </div>

                    {/* Disclaimer check */}
                    <div className="bg-soltex-red/5 border-l-2 border-l-soltex-red p-4 rounded-r-xl mt-4">
                      <p className="text-[10px] font-bold text-soltex-graphite leading-relaxed">
                        {lang === 'ru'
                          ? '🔒 Вся информация используется исключительно для подготовки проектного предложения и рассматривается как строго конфиденциальная согласно стандарту неразглашения NDA.'
                          : lang === 'zh'
                          ? '🔒 所有填写的信息仅供编制项目技术建议方案之用，且将被视为高度机密对待，严格遵循NDA标准。'
                          : '🔒 All information is used exclusively for preparing the project proposal and is treated as strictly confidential under the non-disclosure agreement (NDA).'
                        }
                      </p>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Action Footer Buttons */}
          {!submitSuccess && (
            <div className="border-t border-soltex-border bg-soltex-light-gray/40 px-6 py-4 md:px-8 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  currentStep === 0 
                    ? 'opacity-30 pointer-events-none' 
                    : 'text-soltex-graphite hover:bg-soltex-border/30'
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> {lang === 'ru' ? 'Назад' : lang === 'zh' ? '上一步' : 'Back'}
              </button>

              {currentStep < totalSteps - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-soltex-red hover:bg-soltex-graphite text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  {lang === 'ru' ? 'Далее' : lang === 'zh' ? '下一步' : 'Next'} <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-soltex-red hover:bg-green-600 disabled:bg-soltex-steel text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
                >
                  {isSubmitting
                    ? (lang === 'ru' ? 'Отправка...' : lang === 'zh' ? '提交中...' : 'Sending...')
                    : (lang === 'ru' ? 'Отправить заявку' : lang === 'zh' ? '提交申请报告' : 'Submit Request')
                  }
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const SectionHeading = ({ subtitle, title, alignment = 'left' }: { subtitle: React.ReactNode, title: string | React.ReactNode, alignment?: 'left' | 'center' }) => (
  <div className={`mb-12 md:mb-16 ${alignment === 'center' ? 'text-center flex flex-col items-center' : ''}`}>
    <div className="text-soltex-red font-bold text-xs uppercase tracking-[0.3em] mb-4">
      {subtitle}
    </div>
    <h2 className="text-3xl md:text-5xl font-black max-w-2xl leading-[1.1] tracking-tighter text-soltex-graphite uppercase">
      {title}
    </h2>
  </div>
);

const PageLayout = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="pt-20 bg-soltex-light-gray min-h-screen"
  >
    {children}
  </motion.div>
);

const StatsBar = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-soltex-graphite grid grid-cols-1 md:grid-cols-3 border-b border-soltex-border text-white">
      {t.stats.map((stat: any, i: number) => (
        <div key={i} className={`p-6 md:p-8 lg:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 ${i === 2 ? 'border-none' : ''}`}>
          <div className="text-soltex-red text-3xl md:text-4xl font-black mb-2 tracking-tighter">{stat.value}</div>
          <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/50 leading-snug font-bold">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

const VerticalRail = () => (
  <div className="fixed left-6 bottom-40 vertical-rail text-[10px] text-soltex-steel/50 uppercase tracking-[0.4em] pointer-events-none z-50 hidden xl:block">
    Precision. Power. Control.
  </div>
);

// --- PAGES ---

const Home = () => {
  const { t, lang } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSubject, setModalSubject] = useState("");

  const [homepage, setHomepage] = useState<HomepageContent | null>(null);

  useEffect(() => {
    api.get("/homepage").then((res) => setHomepage(res.data)).catch(console.error);
  }, []);

  const heroTitle = homepage ? getLocalized(homepage, "heroTitle", lang) : t.home.heroTitle;
  const heroDescription = homepage ? getLocalized(homepage, "heroDescription", lang) : t.home.heroDesc;
  const heroQuote = homepage ? getLocalized(homepage, "heroQuote", lang) : t.home.heroUSP;
  const heroImage = homepage?.heroImage ? `${api.defaults.baseURL}${homepage.heroImage}` : null;

  const openModalWithSubject = (subject: string) => {
    setModalSubject(subject);
    setIsModalOpen(true);
  };

  const projectSlides = [
    {
      url: heroImage || "https://lh3.googleusercontent.com/d/1nBSjeCThfhYckyrg_h761TduYbc7bg0p",
      title_ru: "",
      title_en: "",
      title_zh: "",
      tag_ru: "",
      tag_en: "",
      tag_zh: "",
      sector_ru: "",
      sector_en: "",
      sector_zh: ""
    },
    {
      url: "https://lh3.googleusercontent.com/d/17PMvLV2EicOg_qZa7lDsyxs2ejZT6ZrE",
      title_ru: "Завод в Узбекистане: Siberian Wellness",
      title_en: "Siberian Wellness Plant (Uzbekistan)",
      title_zh: "乌兹别克斯坦：Siberian Wellness 柔性提取工厂",
      tag_ru: "ФЛАГМАНСКИЙ ПРОЕКТ",
      tag_en: "FLAGSHIP PROJECT",
      tag_zh: "旗舰示范项目",
      sector_ru: "Гибридный автоматизированный комплекс по получению пектина и инулина",
      sector_en: "Hybrid automated pectin & inulin production complex",
      sector_zh: "果胶及功能性药用菊糖全自动柔性提取车间"
    },
    {
      url: "https://lh3.googleusercontent.com/d/1P1uu_GP0lm29QX6EqQ9-4PglgXuz5Bmo",
      title_ru: "Завод в Казахстане: Экстерьер",
      title_en: "Kazakhstan Plant: Exterior",
      title_zh: "哈萨克斯坦示范工厂：外观实拍",
      tag_ru: "НАШ РЕАЛЬНЫЙ ПРОЕКТ",
      tag_en: "OUR REAL PROJECT",
      tag_zh: "我们真实承建项目",
      sector_ru: "Крупнейший завод глубокой переработки агросырья в регионе",
      sector_en: "The region's largest deep processing agricultural facility",
      sector_zh: "该区域最大的高科技多功能农产品深加工中心"
    },
    {
      url: "https://lh3.googleusercontent.com/d/1BexXBkMOYadzN3VlMyughxT15asiumrY",
      title_ru: "Завод в Казахстане: Технологическая линия",
      title_en: "Kazakhstan Plant: Process Line",
      title_zh: "哈萨克斯坦工厂：现代工艺生产线",
      tag_ru: "СОВРЕМЕННЫЕ ТЕХНОЛОГИИ",
      tag_en: "ADVANCED TECHNOLOGY",
      tag_zh: "现代制造工艺",
      sector_ru: "Технологическая обвязка, каскад реакторов и система экстракции",
      sector_en: "DCS-integrated reactor cascade & automated extraction lines",
      sector_zh: "DCS智能中央控制多级不锈钢反应釜及工艺管网"
    },
    {
      url: "https://lh3.googleusercontent.com/d/1Wsv09_0UJ4tMVWUjcVJTmXepfJWkM-Gg",
      title_ru: "Завод в Казахстане: Оборудование",
      title_en: "Kazakhstan Plant: Equipment",
      title_zh: "哈萨克斯坦工厂：精细提取线",
      tag_ru: "ИНЖЕНЕРНОЕ СОВЕРШЕНСТВО",
      tag_en: "ENGINEERING EXCELLENCE",
      tag_zh: "卓越工程细节",
      sector_ru: "Автоматизированные сепарационные узлы и напорное оборудование",
      sector_en: "High-pressure separators and professional filtration systems",
      sector_zh: "高压离心分离阀门组与自动化高精纯化过滤车间"
    },
    {
      url: "https://lh3.googleusercontent.com/d/1oIXMWuMFADBgEbn2z6AnKWUq-76WAo0g",
      title_ru: "Завод в Азербайджане: Проект AZNAR",
      title_en: "AZNAR Project (Azerbaijan)",
      title_zh: "阿塞拜疆：Aznar项目实拍",
      tag_ru: "НАШ РЕАЛЬНЫЙ ПРОЕКТ",
      tag_en: "OUR REAL PROJECT",
      tag_zh: "我们真实承建项目",
      sector_ru: "Линия экстракции пектина и танина из гранатовой корки",
      sector_en: "Pectin and tannin extraction lines from pomegranate peel",
      sector_zh: "从石榴皮中物理纯化提取高活性果胶与单宁酸生产线"
    },
    {
      url: "https://lh3.googleusercontent.com/d/1DmBSgdbOIenihfL89oAz9MrPK6Gpp0Lo",
      title_ru: "Завод в Израиле: Solbar Israel",
      title_en: "Solbar Israel Plant",
      title_zh: "以色列：Solbar 核心加工厂",
      tag_ru: "РЕАЛИЗОВАННЫЙ ПРОЕКТ",
      tag_en: "COMPLETED PROJECT",
      tag_zh: "已落成示范项目",
      sector_ru: "Строительство цеха соевого изолята мощностью 17 000 т/год",
      sector_en: "EPC construction of soy protein isolate shop (17,000 t/y)",
      sector_zh: "年产17000吨高纯度大豆分离蛋白（SPI）全套提取车间"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + projectSlides.length) % projectSlides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % projectSlides.length);
  };

  useEffect(() => {
    if (projectSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projectSlides.length);
    }, 6000); // stable 6 seconds for every slide
    return () => clearInterval(timer);
  }, [currentSlide, projectSlides.length]);

  // Icons for Block 3 (Sectors)
  const sectorIcons = [Box, ShieldCheck, Award, Factory, Globe];

  // Icons for Block 4 (Why Soltex)
  const whyIcons = [Cpu, ShieldCheck, BarChart3, Award, Settings];

  // Icons for Block 7 (Economics)
  const ecoIcons = [TrendingUp, Truck, Factory, BarChart3, Building2];

  // Icons for Block 8 (IP)
  const ipIcons = [Cpu, Award, ShieldCheck, Server];

  return (
    <div className="bg-white">
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialSubject={modalSubject} />

      {/* — БЛОК 1. ГЛАВНЫЙ ЭКРАН (HERO) СЛАЙДЕР — */}
      <section className="relative border-b border-soltex-border min-h-[600px] lg:h-[calc(100vh-80px)] lg:min-h-0 bg-soltex-graphite mt-16 md:mt-20 overflow-hidden">

        {/* Full-screen Background Image with a rich dark overlay for ultimate contrast & wow effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={`bg-${currentSlide}`}
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              src={projectSlides[currentSlide].url}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-[1px]"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-soltex-graphite via-soltex-graphite/95 to-soltex-graphite/80" />
        </div>

        <div className="grid lg:grid-cols-12 min-h-[600px] lg:h-full lg:min-h-0 relative z-10">
          {/* Left Column (Content): spans 5 columns (40%), with light text on dark background */}
          <div className="lg:col-span-5 flex flex-col justify-center px-6 md:px-12 lg:px-8 xl:px-16 py-6 lg:py-4 xl:py-10 relative z-10">
            {/* Technical blueprint accent */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            <div className="max-w-2xl relative z-10">
              <div className="space-y-4 lg:space-y-4 xl:space-y-6">
                {/* H1 */}
                <h1 className="text-2.5xl sm:text-3.5xl md:text-4xl lg:text-[28px] xl:text-[40px] 2xl:text-[48px] font-black leading-[1.1] text-white tracking-tighter uppercase whitespace-normal">
                  {heroTitle}
                </h1>

                {/* Подзаголовок */}
                <p className="text-white/80 text-xs sm:text-sm lg:text-[13px] xl:text-[15px] leading-relaxed font-semibold">
                  {heroDescription}
                </p>

                {/* УТП - Компактный блок */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-md border-l-2 border-l-soltex-red py-2 px-4 rounded-r-lg shadow-sm flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="text-[10px] font-bold text-soltex-red uppercase tracking-widest whitespace-nowrap">
                    {lang === 'ru' ? 'УТП:' : lang === 'zh' ? '核心优势:' : 'USP:'}
                  </span>
                  <p className="text-white font-bold text-[11px] xl:text-xs leading-snug">
                    {heroQuote}
                  </p>
                </div>

                {/* CTA-кнопка (единственный основной CTA) */}
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    onClick={() => openModalWithSubject(lang === 'ru' ? 'Оставить заявку' : lang === 'zh' ? '提交申请' : 'Submit a request')}
                    className="bg-soltex-red hover:bg-white hover:text-soltex-graphite text-white px-8 py-3.5 xl:py-4 font-black uppercase text-xs tracking-widest transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg hover:shadow-soltex-red/20 rounded-lg active:scale-95 text-center"
                  >
                    {lang === 'ru' ? 'Оставить заявку' : lang === 'zh' ? '提交申请' : 'Submit a request'} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Slider Controls & Dot Indicators */}
              <div className="flex items-center gap-4 mt-5 lg:mt-4 xl:mt-8 pt-3 border-t border-white/5 relative z-20">
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="w-9 h-9 border border-white/20 hover:border-soltex-red text-white hover:text-soltex-red rounded-full flex items-center justify-center transition-all bg-white/5 active:scale-95 cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex gap-2">
                  {projectSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        currentSlide === idx ? 'bg-soltex-red w-7' : 'bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="w-9 h-9 border border-white/20 hover:border-soltex-red text-white hover:text-soltex-red rounded-full flex items-center justify-center transition-all bg-white/5 active:scale-95 cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (Large Animated Image showing actual projects) */}
          <div className="lg:col-span-7 flex items-center justify-center p-4 sm:p-6 lg:p-4 xl:p-8 xl:pl-16 xl:pr-0 relative z-10 min-h-[450px] lg:h-full lg:min-h-0">
            <div className="w-full h-full relative group rounded-l-2xl overflow-hidden shadow-2xl bg-soltex-graphite/50 flex flex-col justify-end">
              {/* Ambient red glow behind the image */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-soltex-red to-orange-600 rounded-l-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 pointer-events-none" />

              <div className="absolute inset-0 z-10 overflow-hidden rounded-l-xl border-l border-y border-white/10">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`img-${currentSlide}`}
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    src={projectSlides[currentSlide].url}
                    alt={lang === 'ru' ? projectSlides[currentSlide].title_ru : lang === 'zh' ? projectSlides[currentSlide].title_zh : projectSlides[currentSlide].title_en}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                {/* Subtle dark gradient to ensure buttons underneath have contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-soltex-graphite/90 via-transparent to-transparent pointer-events-none" />

                {/* Overlay Content representing beautiful minimal text */}
                {!!(lang === 'ru' ? projectSlides[currentSlide].title_ru : lang === 'zh' ? projectSlides[currentSlide].title_zh : projectSlides[currentSlide].title_en) && (
                  <div className="absolute bottom-6 left-6 right-6 z-20 bg-soltex-graphite/85 backdrop-blur-md p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-2xl">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-soltex-red animate-pulse" />
                        <span className="text-[9px] text-soltex-red font-black uppercase tracking-widest block">
                          {lang === 'ru' ? projectSlides[currentSlide].tag_ru : lang === 'zh' ? projectSlides[currentSlide].tag_zh : projectSlides[currentSlide].tag_en}
                        </span>
                      </div>
                      <span className="text-sm text-white font-black uppercase tracking-tight block leading-snug">
                        {lang === 'ru' ? projectSlides[currentSlide].title_ru : lang === 'zh' ? projectSlides[currentSlide].title_zh : projectSlides[currentSlide].title_en}
                      </span>
                      <span className="text-[10px] text-white/70 font-semibold block leading-normal mt-0.5">
                        {lang === 'ru' ? projectSlides[currentSlide].sector_ru : lang === 'zh' ? projectSlides[currentSlide].sector_zh : projectSlides[currentSlide].sector_en}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Инфографика / счётчики */}
      <StatsBar />

      {/* — Video Presentations Section (Moved from About page) — */}
      <section className="py-20 md:py-28 px-6 md:px-10 max-w-7xl mx-auto border-b border-soltex-border">
        <div className="mb-12">
          <div className="text-soltex-red font-bold text-[10px] uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-soltex-red" />
            {t.about.videoSubtitle}
          </div>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-soltex-graphite leading-tight">
            {t.about.videoTitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Video 1 */}
          <IntroVideoCard
            videoUrl="https://www.youtube.com/embed/tfVINbFPnNU"
            title={t.about.video1Title}
            description={t.about.video1Desc}
            badge="01 / Industrial Technologies"
          />

          {/* Video 2 */}
          <IntroVideoCard
            videoUrl="https://www.youtube.com/embed/NmDEZ87_cYs"
            title={t.about.video2Title}
            description={t.about.video2Desc}
            badge="02 / EPCM Standards & Facilities"
          />
        </div>
      </section>

      {/* — БЛОК 2. КЛЮЧЕВЫЕ НАПРАВЛЕНИЯ — */}
      <section className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto overflow-hidden border-b border-soltex-border">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32">
              <div className="text-soltex-red font-bold text-[10px] uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-soltex-red" />
                Engineering Output
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-soltex-graphite uppercase leading-[1.1] mb-8">
                {t.home.whatWeCreate.title}
              </h2>
              <div className="w-16 h-1.5 bg-soltex-red mb-8" />
              <p className="text-soltex-steel text-lg font-medium leading-relaxed mb-12 opacity-80">
                {t.home.whatWeCreate.subtitle}
              </p>
              <Link to="/products" className="inline-flex items-center gap-4 group">
                 <div className="bg-soltex-graphite text-white px-8 py-4 font-black uppercase text-[10px] tracking-widest group-hover:bg-soltex-red transition-all duration-500">
                   Explore Products
                 </div>
                 <div className="w-12 h-12 border border-soltex-border flex items-center justify-center group-hover:border-soltex-red transition-colors">
                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </div>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-1 gap-6 md:gap-10">
            {t.home.whatWeCreate.items.map((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 border-b border-soltex-border pb-6 md:pb-10 group-hover:border-soltex-red transition-colors duration-700">
                  <div className="text-4xl md:text-6xl font-black text-soltex-border group-hover:text-soltex-red/10 transition-colors duration-700 select-none md:w-20">
                    0{i+1}
                  </div>
                  <div className="flex-grow pt-2">
                    <h3 className="text-xl md:text-2xl font-black uppercase text-soltex-graphite mb-3 tracking-tight leading-none group-hover:text-soltex-red transition-colors duration-500">{item.title}</h3>
                    <p className="text-soltex-steel text-base md:text-lg font-medium leading-relaxed max-w-xl group-hover:text-soltex-graphite transition-colors duration-500">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* — БЛОК 3. ОТРАСЛИ ПРИМЕНЕНИЯ — */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-soltex-light-gray overflow-hidden border-b border-soltex-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24">
            <div className="text-soltex-red font-bold text-[10px] uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-soltex-red" />
              Sectors & Application
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-soltex-graphite uppercase leading-[1.1] mb-6">
              {t.home.sectors.title}
            </h2>
            <p className="text-soltex-steel text-lg font-medium max-w-3xl leading-relaxed">
              {t.home.sectors.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-soltex-border border border-soltex-border shadow-xl">
            {t.home.sectors.items.map((item: any, i: number) => {
              const IconComp = sectorIcons[i] || Box;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 lg:px-4 lg:py-6 xl:p-8 hover:bg-soltex-graphite hover:text-white transition-all duration-500 group flex flex-col justify-between min-h-[340px] md:min-h-[360px] lg:min-h-[400px] xl:min-h-[420px]"
                >
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-12 h-12 rounded-xl bg-soltex-light-gray flex items-center justify-center border border-soltex-border group-hover:bg-white/10 group-hover:border-white/10 transition-all">
                        <IconComp className="w-6 h-6 text-soltex-red group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-3xl font-black text-soltex-steel/20 group-hover:text-white/10 select-none">
                        0{i+1}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg lg:text-[13px] xl:text-lg font-black uppercase tracking-tight leading-snug mb-4 group-hover:text-soltex-red transition-colors hyphens-auto break-words">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-soltex-steel text-xs md:text-sm lg:text-[12px] xl:text-sm leading-relaxed group-hover:text-white/80 transition-colors font-medium">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* — БЛОК 4. ПОЧЕМУ SOLTEX — */}
      <section className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto overflow-hidden border-b border-soltex-border">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="text-soltex-red font-bold text-[10px] uppercase tracking-[0.4em] flex items-center gap-3">
              <span className="w-8 h-px bg-soltex-red" />
              Solid Value
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-soltex-graphite uppercase leading-[1.1]">
              {t.home.whySoltex.title}
            </h2>
            <div className="w-20 h-1.5 bg-soltex-red" />
            <p className="text-soltex-steel text-lg font-medium leading-relaxed opacity-85">
              {t.home.whySoltex.subtitle}
            </p>
            <div className="pt-6 hidden lg:block">
              <div className="p-8 border border-soltex-border bg-soltex-light-gray rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-soltex-red/5 rounded-full blur-2xl" />
                <p className="text-xs uppercase font-bold text-soltex-red tracking-widest mb-2">Technical Standard</p>
                <p className="text-soltex-graphite font-black text-lg leading-snug">
                  ISO 9001 • GMP • HACCP • FDA COMPLIANT INGENUITY
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {t.home.whySoltex.items.map((item: any, i: number) => {
              const IconComp = whyIcons[i] || Cpu;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 p-6 border border-soltex-border/50 hover:border-soltex-red bg-white hover:bg-soltex-light-gray/30 transition-all rounded-2xl group"
                >
                  <div className="w-12 h-12 rounded-xl bg-soltex-red/5 group-hover:bg-soltex-red text-soltex-red group-hover:text-white flex items-center justify-center flex-shrink-0 transition-all duration-300">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black uppercase tracking-tight text-soltex-graphite text-lg mb-2 group-hover:text-soltex-red transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-soltex-steel text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* — БЛОК 5. МИССИЯ И ТЕХНОЛОГИЧЕСКИЙ ПОДХОД — */}
      <section className="py-24 md:py-36 bg-soltex-graphite relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-soltex-red opacity-[0.02] -skew-x-[30deg] translate-x-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 text-[20vh] lg:text-[30vh] font-black text-white/[0.015] leading-none select-none -mb-10 lg:-mb-20 -ml-10 lg:-ml-20 pointer-events-none">MISSION</div>

        <div className="px-6 md:px-10 max-w-7xl mx-auto relative z-10">
          <div className="max-w-5xl mb-20 md:mb-32">
            <div className="inline-block border border-soltex-red/30 px-6 py-2 mb-8">
              <div className="text-soltex-red font-bold text-[10px] uppercase tracking-[0.5em]">{t.home.philosophy.title}</div>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.95] mb-10 italic">
               {t.home.philosophy.subtitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
            {t.home.philosophy.items.map((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-soltex-red flex items-center justify-center font-black text-xl text-white">0{i+1}</div>
                    <div className="h-px bg-white/10 flex-grow" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter leading-snug">{item.title}</h3>
                  <p className="text-white/40 text-base md:text-lg font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-soltex-red to-transparent pt-4" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* — БЛОК 6. ЭТАПЫ РЕАЛИЗАЦИИ EPCM-ПРОЕКТА — */}
      <section className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto overflow-hidden border-b border-soltex-border">
        <div className="mb-16 md:mb-24">
          <div className="text-soltex-red font-bold text-[10px] uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-soltex-red" />
            EPCM Workflow
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-soltex-graphite uppercase leading-[1.1] mb-6">
            {t.home.epcmStages.title}
          </h2>
          <p className="text-soltex-steel text-lg font-medium max-w-3xl leading-relaxed">
            {t.home.epcmStages.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
          {t.home.epcmStages.items.map((item: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-soltex-border hover:border-soltex-red hover:shadow-2xl transition-all p-8 rounded-2xl relative group flex flex-col justify-between min-h-[260px] z-10"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="text-xs font-black text-soltex-red bg-soltex-red/5 px-3 py-1.5 rounded-lg border border-soltex-red/10 uppercase tracking-widest">
                    Stage 0{i+1}
                  </div>
                  <span className="text-xs text-soltex-steel/50 font-black tracking-widest uppercase">
                    EPCM
                  </span>
                </div>
                <h3 className="text-lg font-black uppercase text-soltex-graphite mb-3 tracking-tight leading-snug group-hover:text-soltex-red transition-colors">
                  {item.title}
                </h3>
              </div>
              <p className="text-soltex-steel text-sm leading-relaxed group-hover:text-soltex-graphite transition-colors pt-4 border-t border-soltex-border/50">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* — БЛОК 7. ЭКОНОМИКА ПРОЕКТА — */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-soltex-light-gray overflow-hidden border-b border-soltex-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="text-soltex-red font-bold text-[10px] uppercase tracking-[0.4em] flex items-center gap-3">
                <span className="w-8 h-px bg-soltex-red" />
                Financial Architecture
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-soltex-graphite uppercase leading-[1.1]">
                {t.home.economics.title}
              </h2>
              <div className="w-20 h-1.5 bg-soltex-red" />
              <p className="text-soltex-steel text-lg font-medium leading-relaxed opacity-85">
                {t.home.economics.subtitle}
              </p>
              <div className="pt-6">
                <div className="bg-soltex-graphite text-white p-8 rounded-2xl border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-soltex-red/10 rounded-full blur-3xl" />
                  <p className="text-[10px] font-bold text-soltex-red uppercase tracking-widest mb-4">EBITDA & ROI</p>
                  <p className="text-white/70 text-sm font-medium leading-relaxed">
                    {t.home.economics.ebitdaDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                {t.home.economics.items.map((item: any, i: number) => {
                  const IconComp = ecoIcons[i] || TrendingUp;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white border border-soltex-border/50 p-6 md:p-8 rounded-2xl hover:shadow-xl hover:border-soltex-red transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-soltex-red/5 group-hover:bg-soltex-red text-soltex-red group-hover:text-white flex items-center justify-center mb-6 transition-all">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="font-black uppercase tracking-tight text-soltex-graphite text-base md:text-lg mb-3 group-hover:text-soltex-red transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-soltex-steel text-xs md:text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* — БЛОК 8. ИНТЕЛЛЕКТУАЛЬНАЯ СОБСТВЕННОСТЬ — */}
      <section className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto overflow-hidden border-b border-soltex-border">
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <div className="text-soltex-red font-bold text-[10px] uppercase tracking-[0.4em] mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-soltex-red" />
            IP & Know-How Protection
            <span className="w-8 h-px bg-soltex-red" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-soltex-graphite uppercase leading-[1.1] mb-6">
            {t.home.ip.title}
          </h2>
          <p className="text-soltex-steel text-lg font-medium leading-relaxed">
            {t.home.ip.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {t.home.ip.items.map((item: any, i: number) => {
            const IconComp = ipIcons[i] || Cpu;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-soltex-border/60 hover:border-soltex-red p-8 rounded-2xl hover:shadow-xl transition-all bg-white group flex flex-col justify-between min-h-[250px]"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-soltex-graphite/5 text-soltex-graphite group-hover:bg-soltex-red group-hover:text-white flex items-center justify-center mb-8 transition-all duration-300">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-black uppercase tracking-tight text-soltex-graphite text-lg mb-3 group-hover:text-soltex-red transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-soltex-steel text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* — БЛОК 9. КЕЙСЫ И РЕАЛИЗОВАННЫЕ ПРОЕКТЫ — */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-soltex-graphite text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
            <div>
              <div className="text-soltex-red font-bold text-[10px] uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-soltex-red" />
                Global Track Record
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase leading-[1.1]">
                {t.home.cases.title}
              </h2>
            </div>
            <p className="text-white/50 text-base md:text-lg font-medium max-w-xl leading-relaxed">
              {t.home.cases.subtitle}
            </p>
          </div>

          <div className="space-y-16 md:space-y-24">
            {/* Soy Projects Showcase */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-soltex-red font-black text-sm uppercase tracking-widest">01 / {t.projects.soyTitle}</span>
                <span className="h-px bg-white/10 flex-grow" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {t.projects.listSoy.map((item: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 border border-white/10 hover:border-soltex-red hover:bg-white/[0.08] transition-all duration-300 rounded-2xl overflow-hidden group p-6"
                  >
                    <div className="aspect-[4/3] rounded-xl overflow-hidden transition-all duration-500 mb-6 bg-soltex-graphite/40 border border-white/5 relative">
                      <img
                        src={[
                          "https://lh3.googleusercontent.com/d/1DmBSgdbOIenihfL89oAz9MrPK6Gpp0Lo",
                          "https://lh3.googleusercontent.com/d/1DQ2NEmQn_I62kG8EZSodQkJ2FyW-dtJP",
                          "https://lh3.googleusercontent.com/d/1K2snh7dje8hAUqHT6WBa6MRrqJZb5gMR"
                        ][i]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-soltex-red">
                        <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {item.location}</span>
                        <span>{item.period}</span>
                      </div>

                      <h3 className="text-xl font-black uppercase text-white group-hover:text-soltex-red transition-colors tracking-tight leading-none">
                        {item.title}
                      </h3>

                      <p className="text-white/50 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pectin Projects Showcase */}
            <div className="space-y-8 pt-8">
              <div className="flex items-center gap-4">
                <span className="text-soltex-red font-black text-sm uppercase tracking-widest">02 / {t.projects.pectinTitle}</span>
                <span className="h-px bg-white/10 flex-grow" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {t.projects.listPectin.map((item: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 border border-white/10 hover:border-soltex-red hover:bg-white/[0.08] transition-all duration-300 rounded-2xl overflow-hidden group p-6"
                  >
                    <div className="aspect-[16/9] rounded-xl overflow-hidden transition-all duration-500 mb-6 bg-soltex-graphite/40 border border-white/5 relative">
                      <img
                        src={[
                          "https://lh3.googleusercontent.com/d/1oIXMWuMFADBgEbn2z6AnKWUq-76WAo0g",
                          "https://lh3.googleusercontent.com/d/17PMvLV2EicOg_qZa7lDsyxs2ejZT6ZrE",
                          "https://lh3.googleusercontent.com/d/1yEqxfhux7CBb_d5zP1rs_eB7JWLb8FdK"
                        ][i]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-soltex-red">
                        <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {item.location}</span>
                        <span>{item.period}</span>
                      </div>

                      <h3 className="text-2xl font-black uppercase text-white group-hover:text-soltex-red transition-colors tracking-tight leading-none">
                        {item.title}
                      </h3>

                      <p className="text-white/50 text-base leading-relaxed">
                        {item.desc}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.tags?.map((tag: string) => (
                          <span key={tag} className="text-[9px] font-bold uppercase tracking-widest bg-white/10 text-white/85 px-2.5 py-1.5 rounded-md">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <InlineRequestForm />
    </div>
  );
};

interface IntroVideoCardProps {
  videoUrl: string;
  title: string;
  description: string;
  badge: string;
}

const IntroVideoCard = ({ videoUrl, title, description, badge }: IntroVideoCardProps) => {

  const videoId = videoUrl.split("/embed/")[1]?.split("?")[0] ?? "";

  const src = `${videoUrl}${
      videoUrl.includes("?") ? "&" : "?"
  }autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&cc_load_policy=0&showinfo=0&autohide=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`;


  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [isMuted, setIsMuted] = useState(true);

  const [isFullscreen, setIsFullscreen] = useState(false);


  const toggleMute = () => {
    iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: isMuted ? "unMute" : "mute",
          args: [],
        }),
        "https://www.youtube.com"
    );
    setIsMuted((v) => !v);
  };

  const toggleFullscreen = async () => {
    const container = iframeRef.current?.parentElement;
    if (!container) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    if (isMuted) {
      toggleMute();
    }

    await container.requestFullscreen();

    setIsFullscreen(true);
  };

  return (
    <div className="space-y-4">
      <div className="aspect-[16/9] bg-soltex-graphite relative overflow-hidden border border-soltex-border group shadow-lg rounded-xl">
        <iframe
            ref={iframeRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            src={src}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
        />

        <div className="absolute bottom-0 right-0 z-20 flex items-center overflow-hidden rounded-tl-2xl px-5 bg-soltex-red">

          <button
              onClick={toggleMute}
              className="flex h-16 w-16 items-center justify-center text-white transition-colors hover:bg-white/10 active:bg-white/20 cursor-pointer"
          >
            {isMuted ? (
                <VolumeX className="h-6 w-6" />
            ) : (
                <Volume2 className="h-6 w-6" />
            )}
          </button>

          <div className="h-8 w-px bg-white/20" />

          <button
              onClick={toggleFullscreen}
              className="flex h-16 w-16 items-center justify-center text-white transition-colors hover:bg-white/10 active:bg-white/20 cursor-pointer"
          >
            {isFullscreen ? (
                <Shrink className="h-6 w-6" />
            ) : (
                <Expand className="h-6 w-6" />
            )}
          </button>

        </div>

        <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-6 z-10 pointer-events-none">
          <span className="bg-soltex-red text-white text-[8px] md:text-[9px] font-black uppercase tracking-[0.25em] px-2.5 py-1.5 rounded shadow">
            SOLTEX INTRO INCLUDED
          </span>
          <span className="text-[10px] text-white/50 uppercase font-mono tracking-widest bg-soltex-graphite/80 px-2 py-1 rounded">
            1080P HD
          </span>
        </div>
      </div>
      <div>
        <span className="text-[10px] uppercase font-bold text-soltex-red tracking-widest block">{badge}</span>
        <h3 className="text-lg font-black uppercase text-soltex-graphite tracking-tight mt-1">
          {title}
        </h3>
        <p className="text-soltex-steel text-sm leading-relaxed mt-2">
          {description}
        </p>
      </div>
    </div>
  );
};

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <div className="px-6 md:px-10 max-w-7xl mx-auto py-16 md:py-20">
        <SectionHeading subtitle={t.about.subtitle} title={t.about.title} />

        <div className="grid lg:grid-cols-12 gap-10 mb-20 md:mb-32 items-end">
          {/* ... existing about content ... */}
          <div className="lg:col-span-8 relative">
            <div className="aspect-[16/9] overflow-hidden border border-soltex-border group relative">
              <img
                src="https://lh3.googleusercontent.com/d/1P1uu_GP0lm29QX6EqQ9-4PglgXuz5Bmo"
                alt="Industrial Facility"
                className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-all duration-[2s]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-soltex-red/5 group-hover:bg-transparent transition-colors" />
            </div>

            <div className="absolute -bottom-10 -right-10 bg-soltex-red p-12 text-white hidden lg:block max-w-xs">
              <p className="text-sm font-bold uppercase tracking-widest leading-relaxed">
                {t.about.tagline}
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 lg:mb-20">
            <p className="text-soltex-steel text-lg md:text-xl font-medium leading-relaxed italic border-l-4 border-soltex-red pl-6 md:pl-8">
              {t.about.quote}
            </p>
          </div>
        </div>



        <div className="grid lg:grid-cols-5 gap-12 md:gap-16 mb-20 md:mb-32">
          {/* ... rest of about content ... */}
          <div className="lg:col-span-3 space-y-10">
            <div className="bg-white p-8 md:p-12 lg:p-20 border border-soltex-border relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-soltex-red/5 rounded-full blur-3xl" />
              <h3 className="text-xl md:text-2xl font-black mb-6 uppercase tracking-tighter text-soltex-red relative z-10">{t.about.standardsTitle}</h3>
              <p className="text-soltex-steel text-md md:text-lg font-medium leading-relaxed mb-6 relative z-10">
                {t.about.standardsDesc1}
              </p>
              <p className="text-soltex-steel text-md md:text-lg font-medium leading-relaxed mb-10 relative z-10">
                {t.about.standardsDesc2}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-10 border-t border-soltex-border relative z-10">
                {t.about.stats.map((stat: any, i: number) => (
                  <div key={i}>
                    <div className="text-2xl font-black text-soltex-red mb-1">{stat.val}</div>
                    <div className="text-[9px] font-bold text-soltex-steel uppercase tracking-widest leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-soltex-graphite text-white p-8 md:p-10 hover:bg-soltex-red transition-colors duration-500 group">
                <ShieldCheck className="w-8 md:w-10 h-8 md:h-10 text-soltex-red mb-6 group-hover:text-white" />
                <h4 className="font-bold mb-4 uppercase tracking-widest text-sm md:text-base">{t.about.features[0].title}</h4>
                <p className="text-white/50 text-sm group-hover:text-white/90">{t.about.features[0].desc}</p>
              </div>
              <div className="bg-white border border-soltex-border p-8 md:p-10 hover:border-soltex-red transition-all group">
                <Globe className="w-8 md:w-10 h-8 md:h-10 text-soltex-red mb-6" />
                <h4 className="font-bold text-soltex-graphite mb-4 uppercase tracking-widest text-sm md:text-base">{t.about.features[1].title}</h4>
                <p className="text-soltex-steel text-sm">{t.about.features[1].desc}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8 md:space-y-12">
            <div className="border border-soltex-border overflow-hidden h-64 md:h-80 lg:h-[500px]">
               <img src="https://lh3.googleusercontent.com/d/1BexXBkMOYadzN3VlMyughxT15asiumrY" alt="" className="w-full h-full object-cover transition-all duration-700" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-8 md:space-y-10">
               <div className="flex gap-6 md:gap-8 items-start">
                 <div className="bg-soltex-red text-white text-[10px] font-bold px-4 py-2 mt-1">CORE</div>
                 <div>
                    <h4 className="font-black uppercase mb-3 text-lg md:text-xl tracking-tighter">{t.about.features[2].title}</h4>
                    <p className="text-soltex-steel text-sm md:text-md leading-relaxed">{t.about.features[2].desc}</p>
                 </div>
               </div>
               <div className="flex gap-6 md:gap-8 items-start">
                 <div className="bg-soltex-graphite text-white text-[10px] font-bold px-4 py-2 mt-1">INNO</div>
                 <div>
                    <h4 className="font-black uppercase mb-3 text-lg md:text-xl tracking-tighter">{t.about.features[3].title}</h4>
                    <p className="text-soltex-steel text-sm md:text-md leading-relaxed">{t.about.features[3].desc}</p>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* --- Block 3: Success Story Timeline --- */}
        <div className="py-20 md:py-32 border-t border-soltex-border">
          <SectionHeading subtitle="Timeline" title={t.about.timeline.title} />
          <div className="relative mt-16 md:mt-24">
            {/* Vertical Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-soltex-border md:-translate-x-1/2" />

            <div className="space-y-12 md:space-y-24">
              {t.about.timeline.items.map((item: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="flex-1 w-full md:w-1/2 pl-12 md:pl-0 md:px-16">
                    <div className={`${i % 2 === 0 ? 'text-left md:pl-12' : 'text-left md:text-right md:pr-12'}`}>
                      <div className={`mb-4 flex ${i % 2 === 0 ? 'justify-start' : 'justify-start md:justify-end'}`}>
                        <div className="inline-block px-5 py-2 bg-soltex-red text-white font-black text-sm md:text-xl tracking-tighter font-mono shadow-2xl z-20 relative">
                          {item.year}
                        </div>
                      </div>
                      <h4 className="text-xl md:text-2xl font-black uppercase text-soltex-graphite mb-3 tracking-tighter">
                        {item.title}
                      </h4>
                      <p className="text-soltex-steel text-sm md:text-base font-medium leading-relaxed max-w-xl ml-0 mr-auto md:mx-0">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Dot & Line */}
                  <div className={`absolute left-6 md:left-1/2 top-8 h-px bg-soltex-red/30 hidden md:block transition-all duration-500 ${i % 2 === 0 ? 'w-24' : 'w-24 -translate-x-full'}`} />
                  <div className="absolute left-6 md:left-1/2 top-8 w-3 h-3 bg-soltex-red border-4 border-white md:-translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(238,29,36,0.5)] z-30" />

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Block 4: Engineering Potential (Infrastructure) --- */}
        <section className="py-20 md:py-32 bg-soltex-graphite -mx-6 md:-mx-10 px-6 md:px-10 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://lh3.googleusercontent.com/d/1BexXBkMOYadzN3VlMyughxT15asiumrY')] bg-cover bg-center opacity-5 mix-blend-overlay" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="text-soltex-red font-bold text-xs uppercase tracking-[0.4em] mb-6 whitespace-pre-wrap">Public Scale Engineering</div>
                  <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[1.1] mb-8">
                    {t.about.infrastructure.title}
                  </h2>
                  <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed mb-12">
                    {t.about.infrastructure.desc}
                  </p>
                </motion.div>
              </div>

              <div className="grid gap-6">
                {t.about.infrastructure.items.map((item: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 md:p-10 border border-white/10 bg-white/5 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex gap-6 items-start">
                       <div className="p-3 bg-soltex-red/20 text-soltex-red">
                          {i === 0 ? <ShieldAlert className="w-6 h-6" /> : i === 1 ? <Server className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                       </div>
                       <div>
                          <h4 className="font-black uppercase text-lg mb-3 tracking-tight group-hover:text-soltex-red transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-white/40 group-hover:text-white/70 transition-colors text-sm md:text-base leading-relaxed">
                            {item.desc}
                          </p>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- Block 5: Ecosystem --- */}
        <div className="py-20 md:py-32">
          <SectionHeading subtitle="Ecosystem" title={t.about.ecosystem.title} />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-24">
            {t.about.ecosystem.items.map((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group h-full"
              >
                <div className="bg-white border border-soltex-border p-8 h-full flex flex-col transition-all duration-500 hover:border-soltex-red hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-soltex-red" />
                  </div>

                  <div className="mb-8">
                    <div className="w-12 h-12 bg-soltex-light-gray flex items-center justify-center text-soltex-red group-hover:bg-soltex-red group-hover:text-white transition-all duration-300">
                      {i === 0 ? <TrendingUp className="w-6 h-6" /> :
                       i === 1 ? <Box className="w-6 h-6" /> :
                       i === 2 ? <Truck className="w-6 h-6" /> :
                       <Award className="w-6 h-6" />}
                    </div>
                  </div>

                  <h4 className="text-lg font-black uppercase mb-4 tracking-tight group-hover:text-soltex-red transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-soltex-steel text-sm leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
const ServicesPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <div className="px-6 md:px-10 max-w-7xl mx-auto py-16 md:py-24">
        {/* Section 1: EPC Intro */}
        <div className="mb-24 md:mb-32">
          <SectionHeading subtitle={t.services.subtitle} title={t.services.epc.title} />
          <div className="grid lg:grid-cols-12 gap-12 items-center mt-12">
            <div className="lg:col-span-7">
              <p className="text-soltex-steel text-lg md:text-2xl font-medium leading-relaxed mb-8 border-l-4 border-soltex-red pl-8">
                {t.services.epc.desc}
              </p>
              <div className="flex flex-wrap gap-4 mt-12">
                {['HACCP', 'FSSC 22000', 'ISO 22000', 'ISO 9001'].map(std => (
                  <div key={std} className="px-4 py-2 border border-soltex-border text-[10px] font-black tracking-widest text-soltex-graphite uppercase">
                    {std}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
               <div className="aspect-video lg:aspect-square bg-soltex-graphite overflow-hidden relative group">
                  <img src="https://lh3.googleusercontent.com/d/1W90wAQby3pbTtFBdeL6xf_O3kMpQu4wS" alt="EPC Engineering" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-20 h-20 border-2 border-white/20 flex items-center justify-center rounded-full">
                        <Zap className="w-8 h-8 text-white" />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Section 2: Complex Services */}
        <div className="mb-24 md:mb-32">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-soltex-graphite mb-8 max-w-4xl">
            {t.services.complex.title}
          </h2>
          <p className="text-soltex-steel text-lg font-bold mb-12 uppercase tracking-widest">{t.services.complex.desc}</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {t.services.complex.items.map((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-[60px] font-black text-soltex-red/10 absolute -top-8 -left-4 select-none">0{i + 1}</div>
                <div className="relative z-10">
                  <h3 className="text-xl font-black uppercase tracking-tight text-soltex-graphite mb-4 group-hover:text-soltex-red transition-colors">
                    {item.title}
                  </h3>
                  <div className="w-12 h-1 bg-soltex-red mb-6" />
                  <p className="text-soltex-steel text-base font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 3: Technology Transfer Center */}
        <div className="bg-soltex-graphite -mx-6 md:-mx-10 px-6 md:px-10 py-20 md:py-32 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-6">
              {t.services.transferCenter.title}
            </h2>
            <p className="text-soltex-red text-lg md:text-xl font-bold uppercase tracking-widest mb-16 md:mb-24">
              {t.services.transferCenter.desc}
            </p>

            <div className="space-y-24 md:space-y-32">
              {t.services.transferCenter.sections.map((section: any, idx: number) => (
                <div key={idx} className="relative">
                  <div className="flex flex-col lg:flex-row gap-12 md:gap-20">
                    <div className="lg:w-1/3">
                      <div className="sticky top-32">
                        <div className="text-soltex-red text-7xl font-black mb-6 opacity-20">0{idx + 1}</div>
                        <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-none">
                          {section.title}
                        </h3>
                      </div>
                    </div>
                    <div className="lg:w-2/3 grid sm:grid-cols-2 gap-x-12 gap-y-16">
                      {section.items.map((item: any, i: number) => (
                        <div key={i} className="group">
                          <h4 className="text-lg md:text-xl font-black uppercase mb-4 text-white group-hover:text-soltex-red transition-colors flex items-center gap-3">
                            <div className="w-2 h-2 bg-soltex-red" />
                            {item.title}
                          </h4>
                          <p className="text-white/60 text-sm md:text-base leading-relaxed font-medium">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

const ProductsPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <div className="px-6 md:px-10 max-w-7xl mx-auto py-16 md:py-24">
        {/* Hero Section */}
        <div className="mb-24">
          <SectionHeading subtitle={t.products.subtitle} title={t.products.title} />
          <p className="text-soltex-steel text-lg md:text-xl font-medium leading-relaxed max-w-4xl mt-12 bg-soltex-graphite/5 p-8 border-l-4 border-soltex-red">
            {t.products.desc}
          </p>
        </div>

        {/* Product Sections */}
        <div className="space-y-24 md:space-y-40">
          {t.products.sections.map((section: any, idx: number) => (
            <div key={idx} className="group">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                <div className="lg:w-1/2">
                  <div className="text-soltex-red text-9xl font-black opacity-10 absolute -mt-16 -ml-8 select-none">0{idx + 1}</div>
                  <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-soltex-graphite mb-10 leading-[1.1] group-hover:text-soltex-red transition-colors duration-500">
                      {section.title}
                    </h2>
                    <p className="text-soltex-steel text-base font-bold uppercase tracking-widest mb-12 border-b border-soltex-border pb-6">{section.subtitle}</p>

                    <div className="grid gap-8">
                      {section.items.map((item: any, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex gap-6"
                        >
                          <div className="flex-shrink-0 w-12 h-12 bg-white border border-soltex-border flex items-center justify-center font-black text-soltex-red">
                            {i + 1}
                          </div>
                          <div>
                            <h3 className="text-lg font-black uppercase text-soltex-graphite mb-2">{item.title}</h3>
                            <p className="text-soltex-steel text-base font-medium leading-relaxed">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 relative">
                   <div className="aspect-[4/3] bg-soltex-graphite overflow-hidden relative">
                      <img
                        src={[
                          "https://lh3.googleusercontent.com/d/17PMvLV2EicOg_qZa7lDsyxs2ejZT6ZrE",
                          "https://lh3.googleusercontent.com/d/1DmBSgdbOIenihfL89oAz9MrPK6Gpp0Lo",
                          "https://lh3.googleusercontent.com/d/1BexXBkMOYadzN3VlMyughxT15asiumrY",
                          "https://lh3.googleusercontent.com/d/1W90wAQby3pbTtFBdeL6xf_O3kMpQu4wS"
                        ][idx]}
                        alt={section.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[2s]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 border-[20px] border-white pointer-events-none" />
                   </div>
                   <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-soltex-red group-hover:w-full group-hover:h-8 transition-all duration-700 hidden lg:block" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Turnkey Services Section */}
        <div className="mt-32 md:mt-48 bg-soltex-graphite -mx-6 md:-mx-10 px-6 md:px-10 py-24 md:py-32 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-end mb-24">
              <div>
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
                  {t.products.turnkey.title}
                </h2>
                <div className="w-24 h-2 bg-soltex-red" />
              </div>
              <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed">
                {t.products.turnkey.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-white/10 border border-white/10">
              {t.products.turnkey.items.map((item: any, i: number) => (
                <div key={i} className="bg-soltex-graphite p-8 md:p-12 hover:bg-soltex-red transition-colors duration-500 group">
                   <div className="text-5xl font-black text-white/10 group-hover:text-white/20 mb-12">0{i + 1}</div>
                   <h3 className="text-xl font-black uppercase mb-6 tracking-tight">{item.title}</h3>
                   <p className="text-white/50 text-sm font-medium leading-relaxed group-hover:text-white transition-colors">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

const ProjectsPage = () => {
  const { t, lang } = useTranslation();

  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    Promise.all([
      api.get("/categories"),
      api.get("/items")
    ])
      .then(([catRes, itemRes]) => {
        setCategories(catRes.data);
        setProjects(itemRes.data);
      })
      .catch(console.error);
  }, []);

  return (
    <PageLayout>
      <div className="px-6 md:px-10 max-w-7xl mx-auto py-16 md:py-20">
        <SectionHeading subtitle={t.projects.subtitle} title={t.projects.title} />

        <p className="text-soltex-steel text-lg md:text-xl font-medium leading-relaxed mb-16 md:mb-24 max-w-3xl">
          {t.projects.desc}
        </p>

        {categories.map((category, categoryIndex) => {
          const categoryProjects = projects.filter(p => p.categoryId === category.id);
          if (!categoryProjects.length) return null;

          const isGridLayout = (category as any).layoutType === "grid";
          const isShowcaseLayout = (category as any).layoutType === "showcase";

          return (
            <div key={category.id} className={isShowcaseLayout ? "mb-10 md:mb-20" : "mb-24 md:mb-40"}>
              <div className="flex items-center gap-4 md:gap-6 mb-12 md:mb-16">
                <div className="w-10 md:w-12 h-10 md:h-12 flex-shrink-0 rounded-full border-2 border-soltex-red flex items-center justify-center font-black text-soltex-red text-sm md:text-base">
                  {(categoryIndex + 1).toString().padStart(2, "0")}
                </div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-soltex-graphite">
                  {getLocalized(category, "title", lang)}
                </h3>
                <div className="h-px bg-soltex-border flex-grow" />
              </div>

              {/* Grid layout (e.g. Soy Section with Horizontal Rhythm) */}
              {isGridLayout && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-soltex-border border border-soltex-border">
                  {categoryProjects.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-8 md:p-10 lg:p-14 transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,0,0,0.05)] relative group z-10"
                    >
                      <div className="mb-8 md:mb-10 aspect-[4/3] overflow-hidden transition-all duration-700 border border-soltex-border p-1 bg-white">
                        <img
                          src={`${api.defaults.baseURL}${p.image}`}
                          alt={getLocalized(p, "title", lang)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                        />
                      </div>
                      <div className="text-soltex-red text-[9px] md:text-[10px] font-bold mb-4 md:mb-6 tracking-widest uppercase flex items-center gap-2 md:gap-3">
                        <MapPin className="w-3 h-3" /> {lang === "ru" ? p.countryRu : p.countryEn} <span className="opacity-30">|</span> {p.projectYear}
                      </div>
                      <h4 className="text-xl md:text-2xl font-black uppercase mb-4 md:mb-6 group-hover:text-soltex-red transition-colors tracking-tighter leading-tight">
                        {getLocalized(p, "title", lang)}
                      </h4>
                      <p className="text-soltex-steel text-sm md:text-md font-medium leading-relaxed whitespace-pre-line">
                        {getLocalized(p, "description", lang)}
                      </p>
                    </motion.div>
                  ))}
                  {Array.from({ length: (3 - (categoryProjects.length % 3)) % 3 }).map((_, i) => (
                    <div key={i} className="invisible bg-white" />
                  ))}
                </div>
              )}

              {/* CHS Acquisition Insight (static promotional block, shown after the first category) */}
              {categoryIndex === 0 && (
                <div className="mt-24 md:mt-32">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="bg-soltex-graphite border border-soltex-border relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-soltex-red opacity-10 skew-x-12 translate-x-20 pointer-events-none" />

                    <div className="grid lg:grid-cols-2 gap-0 relative z-10">
                      <div className="p-8 md:p-12 lg:p-20 flex flex-col justify-center">
                        <div className="text-soltex-red font-bold text-xs uppercase tracking-[0.4em] mb-6 md:mb-8">{t.projects.acquisition.subtitle}</div>
                        <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none mb-8 md:mb-10">
                          {t.projects.acquisition.title.split('\n').map((line: string, i: number) => (
                            <span key={i}>{line} <br /></span>
                          ))}
                        </h3>
                        <p className="text-white/60 text-base md:text-lg font-medium leading-relaxed mb-8 md:mb-10 max-w-xl">
                          {t.projects.acquisition.desc}
                        </p>
                        <a
                          href="https://www.ishitech.co.il/1211ar2.htm"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-4 text-white font-black uppercase text-xs tracking-widest group w-fit"
                        >
                          {t.projects.acquisition.link} <ChevronRight className="w-4 h-4 text-soltex-red group-hover:translate-x-2 transition-transform" />
                        </a>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-soltex-border">
                        <div className="h-full min-h-[250px] md:min-h-[300px] overflow-hidden transition-all duration-700">
                          <img
                            src="https://lh3.googleusercontent.com/d/1Wsv09_0UJ4tMVWUjcVJTmXepfJWkM-Gg"
                            alt="CHS Facility"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="h-full min-h-[250px] md:min-h-[300px] overflow-hidden transition-all duration-700">
                          <img
                            src="https://lh3.googleusercontent.com/d/1IoLMJnfBDPmc7wyzAzAfkzUl8OiQigzS"
                            alt="Board Meeting"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Showcase layout (e.g. Pectin Section with Overlapping Layout) */}
              {isShowcaseLayout && (
                <div className="space-y-20 md:space-y-32">
                  {categoryProjects.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 md:gap-16 items-center`}
                    >
                      <div className="w-full lg:w-1/2 relative group">
                        <div className="aspect-[16/10] border border-soltex-border p-2 bg-white relative z-10 overflow-hidden shadow-xl">
                          <img
                            src={`${api.defaults.baseURL}${p.image}`}
                            className="h-full w-full object-cover group-hover:scale-105 transition-all duration-[1.5s]"
                            alt={getLocalized(p, "title", lang)}
                          />
                        </div>
                        <div className={`absolute -top-6 ${i % 2 === 0 ? '-right-6' : '-left-6'} bg-soltex-red text-white p-6 font-black uppercase text-xs tracking-widest hidden lg:block`}>
                          {getLocalized(p, "country", lang)}
                        </div>
                      </div>
                      <div className="w-full lg:w-1/2 px-2 md:px-0">
                        <div className="text-soltex-red font-bold text-[10px] uppercase tracking-[0.3em] mb-4 md:mb-6">{p.projectYear}</div>
                        <h4 className="text-2xl md:text-4xl font-black uppercase mb-6 md:mb-8 tracking-tighter leading-none text-soltex-graphite">
                          {lang === "ru" ? p.titleRu : p.titleEn}
                        </h4>
                        <p className="text-soltex-steel text-lg md:text-xl font-medium mb-8 md:mb-10 leading-relaxed border-l-4 border-soltex-border pl-6 md:pl-8 italic">
                          {getLocalized(p, "description", lang)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PageLayout>
  );
};

const TechPage = () => {
  const { t, lang } = useTranslation();
  const tech = (t as any).techPage || {
    subtitle: "ТЕХНОЛОГИЧЕСКИЕ РЕШЕНИЯ",
    title: "Передовые технологии промышленного био-рефайнинга и экстракции",
    desc: "Инженерные решения Soltex Group базируются на многолетних научных исследованиях, запатентованных физико-химических процессах и практическом опыте создания масштабных производств во всем мире. Мы создаем заводы будущего, обеспечивая максимальную прибыльность переработки растительного сырья.",
    comingSoon: "Раздел находится в процессе наполнения подробным техническим описанием оборудования, схем автоматизации и патентных спецификаций.",
    ctaTitle: "Готовы обсудить технологическую схему вашего будущего предприятия?",
    ctaDesc: "Свяжитесь с нашими инженерами-технологами для проведения первичного аудита сырьевой базы и разработки концептуального решения.",
    ctaBtn: "Запросить аудит технологии"
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Multilingual content for patents & Kazakhstan plant
  const content = {
    ru: {
      patentsTitle: "Описание запатентованных технологий",
      patentsSubtitle: "ИНТЕЛЛЕКТУАЛЬНАЯ СОБСТВЕННОСТЬ SOLTEX GROUP",
      patentsDesc: "Наши технологические процессы защищены международными патентами и авторскими свидетельствами, гарантируя клиентам эксклюзивность решений.",

      patent1: {
        num: "ПАТЕНТ RU 2709384 C1",
        title: "Инновационное производство соевого изолята: технология ферментативного гидролиза",
        productTitle: "О продукте",
        productDesc: "Соевый изолированный белок — высокомаржинальный продукт, востребованный в производстве спортивного и детского питания, мясной и молочной продукции. Он отлично усваивается и отвечает рекомендациям ВОЗ по экологичному замещению животных белков.",
        uniqTitle: "Уникальность технологии",
        uniqDesc: "Метод устраняет главные недостатки традиционного производства: потерю сырья, высокие затраты на реагенты и плохую растворимость. Данная инновация уже успешно масштабирована и применяется на нескольких современных заводах в Израиле, Китае, США, подтверждая свою коммерческую и экологическую эффективность.",
        bullets: [
          {
            title: "Оптимизированный гидролиз",
            desc: "Дорогостоящий фермент (бромелайн) применяется в микродозах (0,2–1%) и добавляется только к уже очищенному от клетчатки и сахаров белку, что радикально снижает себестоимость процесса."
          },
          {
            title: "Идеальная усвояемость",
            desc: "Расщепление молекулярной решетки до мелких пептидов (до 10 кДа) повышает растворимость конечного продукта в 6,8 раз."
          },
          {
            title: "Премиальная органолептика",
            desc: "Мгновенный паровой термошок (135–140°C на 0,2 сек) с последующим резким вакуумным охлаждением (до 55°C) испаряет специфический соевый запах без денатурации белка. Изолят получается однородным, светлым и обладает низкой вязкостью."
          }
        ]
      },

      patent2: {
        num: "ПАТЕНТ № 113754",
        title: "Экологичная «зеленая» технология производства пектина и пищевых волокон",
        productTitle: "О продукте",
        productDesc: "Пектин и пищевые волокна — востребованные ингредиенты для пищевой и косметической промышленности. Современный рынок требует высокой чистоты продукта и перехода на безопасные, нетоксичные методы его извлечения.",
        uniqTitle: "Уникальность технологии",
        uniqDesc: "Метод основан на передовой кавитационной экстракции пектина и пищевых волокон. Данная инновация уже успешно масштабирована и применяется на одном из самых современных заводов в Азии, подтверждая свою коммерческую и экологическую эффективность.",
        bullets: [
          {
            title: "Бесспиртовой «зеленый» стандарт",
            desc: "Технология полностью исключает применение спиртов, гарантируя абсолютную пищевую безопасность конечного продукта."
          },
          {
            title: "Минимум химической нагрузки",
            desc: "Вместо тяжелых кислотно-щелочных катализаторов применяется органическая кислота в минимальных количествах."
          },
          {
            title: "Бережная очистка",
            desc: "Процесс включает вымывание балластных веществ, мягкую обработку и фильтрацию для получения чистой твердой утяжки. Это позволяет максимально сохранить природную структуру пектина и свойства пищевых волокон."
          }
        ]
      },

      uzPlant: {
        subtitle: "ФЛАГМАНСКИЙ ПРОЕКТ В СНГ",
        title: "Завод в Узбекистане: Siberian Wellness",
        desc: "Проектирование и строительство «под ключ» уникального гибридного производственного комплекса для компании Siberian Wellness в Узбекистане (2023–2025). Проект воплощает концепцию Industry 4.0, объединяя передовые технологии экстракции и полную автоматизацию.",
        prodTitle: "Гибридная структура и мощность производства:",
        prodDesc: "Годовая мощность комплекса составляет 500 тонн высокоочищенного яблочного пектина и 800 тонн ценных пищевых волокон. В технологическую схему успешно интегрированы уникальные гибкие линии по глубокой переработке топинамбура в фармацевтический инулин с автоматическим DCS-управлением.",
        tags: ["WELLNESS", "INULIN", "SCALING"],
        metrics: [
          { label: "Мощность пектина", val: "500 т/год" },
          { label: "Пищевые волокна", val: "800 т/год" },
          { label: "Уровень автоматизации", val: "100% DCS" }
        ],
        galleryTitle: "Промышленная фотогалерея завода",
        images: [
          {
            title: "Строительство экстракционной башни",
            desc: "Монтаж многоярусного открытого стального каркаса технологической колонны и вспомогательного оборудования."
          },
          {
            title: "Сборка нержавеющего силоса",
            desc: "Процесс высокоточной сборки и обвязки крупногабаритной экстракционной емкости непосредственно на монтажной площадке."
          },
          {
            title: "Готовый технологический цех глубокой переработки",
            desc: "Панорамный вид готового экстракционного цеха с установленными каскадами нержавеющих реакторов, трубопроводной обвязкой и насосным оборудованием высокого давления (100% АСУ ТП)."
          }
        ]
      },

      kzPlant: {
        subtitle: "РЕАЛИЗОВАННЫЕ ПРОЕКТЫ",
        title: "Завод в Казахстане: Передовое инновационное производство",
        desc: "Завод в Казахстане — это современный производственный комплекс, специализирующийся на глубокой экологичной переработке сельскохозяйственного сырья. На базе этого предприятия масштабирована и внедрена уникальная запатентованная технология, задающая новые мировые стандарты качества в пищевой промышленности.",
        prodTitle: "Продукция и технологическая база завода:",
        prodDesc: "Премиальный соевый изолят (Патент RU 2709384 C1): Уникальная технология оптимизированного ферментативного гидролиза позволяет получать легкоусвояемый соевый белок (до 10 кДа). Наш продукт обладает высокой растворимостью, светлым кремовым цветом и полностью лишен специфического запаха благодаря системе вакуумного термошока.",
        tags: ["СОЕВЫЙИЗОЛЯТ", "ГИДРОЛИЗ", "ГЛУБОКАЯПЕРЕРАБОТКА"],
        metrics: [
          { label: "Технология", val: "Ферментативный гидролиз" },
          { label: "Пароочистка", val: "Термошок" },
          { label: "Патент", val: "RU 2709384 C1" }
        ],
        galleryTitle: "Промышленная фотогалерея завода",
        images: [
          {
            title: "Экстерьер завода в Казахстане",
            desc: "Современный производственный комплекс глубокой переработки растительного сырья в Казахстане."
          },
          {
            title: "Экстракционный цех",
            desc: "Каскад технологических реакторов и трубопроводная обвязка из нержавеющей стали AISI 316L."
          },
          {
            title: "Шкафы автоматики и SCADA",
            desc: "Силовые распределительные щиты, ПЛК-контроллеры и контрольно-измерительные приборы автоматизации."
          }
        ]
      }
    },
    en: {
      patentsTitle: "Description of Patented Technologies",
      patentsSubtitle: "SOLTEX GROUP INTELLECTUAL PROPERTY",
      patentsDesc: "Our technological processes are protected by international patents and copyrights, ensuring exclusiveness of technical solutions for our clients.",

      patent1: {
        num: "PATENT RU 2709384 C1",
        title: "Innovative Soy Protein Isolate Production: Enzymatic Hydrolysis Technology",
        productTitle: "About the Product",
        productDesc: "Soy protein isolate is a high-margin product in demand for sports and baby nutrition, meat, and dairy production. It is highly digestible and meets WHO recommendations for eco-friendly replacement of animal proteins.",
        uniqTitle: "Technology Uniqueness",
        uniqDesc: "The method eliminates the main drawbacks of traditional production: raw material loss, high reagent costs, and poor solubility. This innovation has been successfully scaled and implemented at several modern plants in Israel, China, and the USA, proving its commercial and environmental efficiency.",
        bullets: [
          {
            title: "Optimized Hydrolysis",
            desc: "The expensive enzyme (bromelain) is used in micro-doses (0.2–1%) and is added only to the protein already purified from fiber and sugars, radically reducing processing costs."
          },
          {
            title: "Perfect Digestibility",
            desc: "Cleaving the molecular lattice into small peptides (up to 10 kDa) increases the solubility of the final product by 6.8 times."
          },
          {
            title: "Premium Organoleptics",
            desc: "Instant steam thermal shock (135–140°C for 0.2 sec) followed by rapid vacuum cooling (to 55°C) vaporizes the specific soy odor without protein denaturation. The isolate is homogeneous, light-colored, and has low viscosity."
          }
        ]
      },

      patent2: {
        num: "PATENT APPLICATION NO. 113754",
        title: "Eco-Friendly 'Green' Pectin & Dietary Fiber Production Technology",
        productTitle: "About the Product",
        productDesc: "Pectin and dietary fibers are high-demand ingredients for the food and cosmetics industries. The modern market demands high product purity and a transition to safe, non-toxic extraction methods.",
        uniqTitle: "Technology Uniqueness",
        uniqDesc: "The method is based on advanced cavitation extraction of pectin and dietary fibers. This innovation has been successfully scaled and is in operation at one of the most advanced plants in Asia, proving its commercial and environmental efficiency.",
        bullets: [
          {
            title: "Alcohol-Free Green Standard",
            desc: "The technology completely eliminates the use of alcohols, ensuring absolute food safety of the final product."
          },
          {
            title: "Minimal Chemical Footprint",
            desc: "Instead of aggressive acid-base catalysts, a organic acid is applied in minimal quantities."
          },
          {
            title: "Gentle Purification",
            desc: "The process includes washing out ballast substances, mild processing, and filtration to obtain a pure solid yield. This preserves the natural structure of pectin and the healthy properties of dietary fibers."
          }
        ]
      },

      uzPlant: {
        subtitle: "FLAGSHIP PROJECT IN CIS",
        title: "Plant in Uzbekistan: Siberian Wellness",
        desc: "Turnkey design and construction of a unique hybrid production complex for Siberian Wellness in Uzbekistan (2023–2025). The project study and execution embodies the Industry 4.0 concept, combining advanced extraction technologies and full automation.",
        prodTitle: "Hybrid Structure & Production Capacity:",
        prodDesc: "The plant's annual capacity is 500 tons of highly purified apple pectin and 800 tons of high-quality dietary fiber. The technology scheme seamlessly integrates flexible processing lines for converting Jerusalem artichoke to pharmaceutical-grade inulin with DCS automation.",
        tags: ["WELLNESS", "INULIN", "SCALING"],
        metrics: [
          { label: "Pectin Capacity", val: "500 t/y" },
          { label: "Dietary Fibers", val: "800 t/y" },
          { label: "Automation Level", val: "100% DCS" }
        ],
        galleryTitle: "Industrial Plant Gallery",
        images: [
          {
            title: "Extraction Tower Construction",
            desc: "Assembly of the multi-tier open steel frame tower and primary extraction equipment."
          },
          {
            title: "Stainless Steel Silo Assembly",
            desc: "High-precision field assembly and piping of the large-scale extraction vessel."
          },
          {
            title: "Completed Deep Processing Shop",
            desc: "Panoramic view of the fully assembled extraction hall featuring stainless steel reactors, piping manifolds, high-pressure pumps, and DCS integration."
          }
        ]
      },

      kzPlant: {
        subtitle: "COMPLETED PROJECTS",
        title: "Plant in Kazakhstan: Advanced Innovative Production",
        desc: "The plant in Kazakhstan is a modern production complex specializing in deep eco-friendly processing of agricultural raw materials. Based on this enterprise, a unique patented technology has been scaled and implemented, setting new global quality standards in the food industry.",
        prodTitle: "Plant Products & Technology Base:",
        prodDesc: "Premium Soy Isolate (Patent RU 2709384 C1): A unique optimized enzymatic hydrolysis technology yields easily digestible soy protein (up to 10 kDa). Our product has high solubility, a light cream color, and is completely free of any off-odors due to the advanced vacuum thermal shock system.",
        tags: ["SOYISOLATE", "HYDROLYSIS", "DEEPPROCESSING"],
        metrics: [
          { label: "Core Technology", val: "Enzymatic Hydrolysis" },
          { label: "Odor Removal", val: "Thermal Shock" },
          { label: "Patent", val: "RU 2709384 C1" }
        ],
        galleryTitle: "Industrial Plant Gallery",
        images: [
          {
            title: "Kazakhstan Plant Exterior",
            desc: "Modern agricultural deep processing factory facility located in Kazakhstan."
          },
          {
            title: "Extraction Department",
            desc: "Cascade of reactor vessels and stainless piping in AISI 316L steel."
          },
          {
            title: "Automation Cabinets & SCADA",
            desc: "Power distribution panels, programmable logic controllers, and advanced process instrumentation."
          }
        ]
      }
    },
    zh: {
      patentsTitle: "核心专利工艺技术说明",
      patentsSubtitle: "SOLTEX GROUP 核心知识产权",
      patentsDesc: "我们的生产工艺流程受到多项国际发明专利及版权严格保护，确保为客户提供具备排他性与极致竞争力的专有技术方案。",

      patent1: {
        num: "发明专利 RU 2709384 C1",
        title: "创新大豆分离蛋白生产：酶法水解工艺技术",
        productTitle: "产品应用前景",
        productDesc: "大豆分离蛋白（SPI）是一种高附加值、高毛利产品，广泛应用于运动营养食品、婴儿食品、肉制品及乳制品中。它具有极佳的消化吸收率，符合世界卫生组织（WHO）倡导的绿色环保动物蛋白替代标准。",
        uniqTitle: "专有工艺独特性",
        uniqDesc: "该项专利技术彻底解决了传统大豆蛋白生产中原料流失率高、化学试剂消耗量大及溶解度低等痛点。目前该创新工艺已成功在以色列、中国、美国的数个现代化工厂实现工业化放大和运营，充分证实了其极高的商业与环保价值。",
        bullets: [
          {
            title: "优化定向酶法水解",
            desc: "高成本酶制剂（菠萝蛋白酶）以微量（0.2-1%）精准配比添加，且仅在原料脱除纤维和糖类后加入，从根本上降低了整体工艺的综合成本。"
          },
          {
            title: "极佳人体吸收率",
            desc: "大分子蛋白链经定向剪切至 10 kDa 以下的小分子活性肽，使终端产品的溶解性与分散度显著提升 6.8 倍。"
          },
          {
            title: "风味与感官品质提升",
            desc: "瞬时蒸汽热冲击（135-140°C，持续 0.2 秒）配合极速真空闪蒸降温（至 55°C），在不改变蛋白质生物活性的前提下彻底脱除大豆特有的豆腥味。所得分离蛋白色泽乳白匀称、粘度极低。"
          }
        ]
      },

      patent2: {
        num: "专利申请号 113754",
        title: "绿色环保型果胶及高活性膳食纤维综合生产技术",
        productTitle: "产品应用前景",
        productDesc: "果胶和天然膳食纤维是食品及化妆品工业中极其核心、高需求的添加原料。当今国际市场对产品的纯净度及低碳无毒萃取工艺有着极高的准入标准。",
        uniqTitle: "专有工艺独特性",
        uniqDesc: "本工艺基于多物理场强化的空化物理萃取核心专利技术。目前已在亚洲最先进的绿色深加工工厂中实现工业化平稳满负荷运转，展示了其卓越的商业及生态效率优势。",
        bullets: [
          {
            title: "无醇绿色精炼标准",
            desc: "该套工艺技术全线绝不添加任何工业酒精或醇类溶剂，确保所得成品具备顶级的食品安全及清真级合规标准。"
          },
          {
            title: "极低酸碱化学负荷",
            desc: "彻底抛弃了传统酸法对设备的腐蚀和对环境的酸碱污染，仅以极微量温和有机酸进行精准催化提取。"
          },
          {
            title: "柔性物理分离净化",
            desc: "采用创新的逆流浸提、物料梯度洗涤与超滤耦合净化工艺，温和洗去杂质，最大化保留天然果胶原有的高分子酯化结构与纤维活性。"
          }
        ]
      },

      uzPlant: {
        subtitle: "独联体大健康产业旗舰示范项目",
        title: "乌兹别克斯坦未来工厂：Siberian Wellness",
        desc: "为知名跨国大健康品牌 Siberian Wellness 全总承包（EPC/EPCM）承建的混合柔性未来绿色工厂（2023–2025年）。该项目全面融合了现代物理级提取工艺与工业 4.0 全流程自动化控制体系。",
        prodTitle: "柔性结构与多功能产能规划：",
        prodDesc: "设计年产能达 500 吨活性极高的苹果果胶、800 吨优质功能性膳食纤维。项目更成功高水平集成了洋姜药用纯度结步菊糖柔性生产线，实现全自动化 DCS 中央控制系统对接。",
        tags: ["WELLNESS", "INULIN", "SCALING"],
        metrics: [
          { label: "苹果果胶产能", val: "500 吨/年" },
          { label: "高活性膳食纤维", val: "800 吨/年" },
          { label: "自动化中控级别", val: "100% DCS" }
        ],
        galleryTitle: "示范工厂现场工业写实",
        images: [
          {
            title: "提取塔多层钢结构建设阶段",
            desc: "多层露天钢结构提取塔及核心设备的吊装与工艺安装。"
          },
          {
            title: "不锈钢提取釜现场高精装配",
            desc: "在施工现场进行大型高规格不锈钢提取容器及管网的高精组装与焊接。"
          },
          {
            title: "落成启用的自动化深加工提取车间",
            desc: "全景展示已完工的工业化车间，不锈钢反应釜群、工艺管网、高压泵送电机组及 100% DCS 中控系统。"
          }
        ]
      },

      kzPlant: {
        subtitle: "已落成示范项目",
        title: "哈萨克斯坦示范工厂：行业领先的高科技加工中心",
        desc: "位于哈萨克斯坦的大型工厂是一座技术先进、绿色环保的农业原料精深加工示范中心。依托该实业载体，Soltex 将自主专利工艺全面落地及工业化放大，重新定义了全球食品配料领域的品质标杆。",
        prodTitle: "工厂主营产品及核心生产工艺：",
        prodDesc: "高端特级大豆分离蛋白（专利 RU 2709384 C1）：采用独家专利定向酶法水解工艺，生产分子量小于 10 kDa、更易被人体吸收的高端蛋白质。依靠先进 of 蒸汽热冲击与闪蒸系统，产品具备高水溶性、外观亮丽无杂质，且彻底脱除异味豆腥味。",
        tags: ["SOYISOLATE", "HYDROLYSIS", "DEEPPROCESSING"],
        metrics: [
          { label: "核心工艺", val: "定向酶法水解" },
          { label: "风味提纯", val: "蒸汽真空热冲击" },
          { label: "核心专利", val: "RU 2709384 C1" }
        ],
        galleryTitle: "示范工厂现场工业写实",
        images: [
          {
            title: "哈萨克斯坦示范厂外景",
            desc: "位于哈萨克斯坦的全新全链条高科技生物深加工工厂全貌。"
          },
          {
            title: "多级萃取分离主车间",
            desc: "连续逆流抽提装置及成套不锈钢高压反应釜、离心分离系统。"
          },
          {
            title: "SCADA 与电气中控系统",
            desc: "全集成智能化 DCS 工艺过程控制器和气动执行控制阀门机柜。"
          }
        ]
      }
    }
  };

  const activeContent = content[lang] || content.ru;

  const galleryImages = [
    {
      url: "https://lh3.googleusercontent.com/d/1xt9pcEhccWjTTR4YeDsHK_7MYMgrn4iG",
      title: activeContent.uzPlant.images[0].title,
      desc: activeContent.uzPlant.images[0].desc
    },
    {
      url: "https://lh3.googleusercontent.com/d/1XZSLCBeCXPQ4FvIDyA5fuHE3pSvp_qb0",
      title: activeContent.uzPlant.images[1].title,
      desc: activeContent.uzPlant.images[1].desc
    },
    {
      url: "https://lh3.googleusercontent.com/d/1v_mJC8I0hX4TdPVsv4CvO_PVG1EL6JGQ",
      title: activeContent.uzPlant.images[2].title,
      desc: activeContent.uzPlant.images[2].desc
    }
  ];

  const techHighlights = [
    {
      icon: Cpu,
      title: lang === 'ru' ? "Кавитационная экстракция" : lang === 'zh' ? "空化物理萃取" : "Cavitation Extraction",
      desc: lang === 'ru' ? "Экологически чистая безспиртовая экстракция пектина и пищевых волокон." : lang === 'zh' ? "绿色环保零醇提取优质果胶及功能性膳食纤维。" : "Eco-friendly, alcohol-free extraction of pectin and dietary fibers."
    },
    {
      icon: Zap,
      title: lang === 'ru' ? "Водно-щелочная экстракция белков" : lang === 'zh' ? "多级纯水相蛋白分离" : "Aqueous Protein Isolation",
      desc: lang === 'ru' ? "Максимальный выход и чистота растительных изолятов без агрессивных кислот." : lang === 'zh' ? "保障极高干物质回收率与纯净度，白片深加工标准。" : "Max yield and purity of plant isolates without harsh acids."
    },
    {
      icon: Settings,
      title: lang === 'ru' ? "Автоматизация SCADA/DCS" : lang === 'zh' ? "SCADA/DCS 自动控制" : "SCADA/DCS Automation",
      desc: lang === 'ru' ? "Полный цифровой контроль всех технологических переделов и параметров." : lang === 'zh' ? "全套数字工业中控，全天候全流程工艺参数精确监控。" : "Full digital twin control of all chemical process parameters."
    },
    {
      icon: ShieldCheck,
      title: lang === 'ru' ? "Зеленые технологии" : lang === 'zh' ? "零排放与循环经济" : "Green Technologies",
      desc: lang === 'ru' ? "Минимальный углеродный след, оборотное водоснабжение, отсутствие вредных стоков." : lang === 'zh' ? "超低碳足迹，闭路循环水，无任何有害废水排放。" : "Zero effluent discharge, minimal carbon footprint, water recycling."
    }
  ];

  return (
    <PageLayout>
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 md:py-16">
        {/* --- Section 2: Patent 2 (Premium Beautiful Styling) --- */}
        <div className="mb-20">
          <SectionHeading
            subtitle={
              <div className="inline-flex items-center gap-3 bg-soltex-graphite px-4 py-2 rounded-xl border border-soltex-red/20 shadow-[0_0_15px_rgba(230,57,70,0.1)] mb-2">
                <span className="text-soltex-red font-black text-[11px] uppercase tracking-widest">{lang === 'ru' ? 'ПАТЕНТ №1' : lang === 'zh' ? '专利 №1' : 'PATENT №1'}</span>
                <span className="w-px h-4 bg-white/20"></span>
                <span className="text-white font-bold text-[10px] uppercase tracking-widest">{lang === 'ru' ? 'ЗАВОД В УЗБЕКИСТАНЕ (SIBERIAN WELLNESS)' : lang === 'zh' ? '乌兹别克斯坦示范工厂 (SIBERIAN WELLNESS)' : 'PLANT IN UZBEKISTAN (SIBERIAN WELLNESS)'}</span>
              </div>
            }
            title={activeContent.patent2.title}
          />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-12 items-stretch">
            {/* Left side: Information, details, bullets and gallery selector */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-soltex-red/5 text-soltex-red text-xs font-black uppercase rounded-lg tracking-widest mb-4 border border-soltex-red/10 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 animate-pulse" />
                    {lang === 'ru' ? 'Локация: Наманган, Узбекистан' : lang === 'zh' ? '地理位置：乌兹别克斯坦纳曼干' : 'Location: Namangan, Uzbekistan'}
                  </div>
                  <h4 className="font-black text-xs uppercase tracking-wider text-soltex-steel mb-2">
                    {activeContent.patent2.productTitle}
                  </h4>
                  <p className="text-soltex-steel text-sm leading-relaxed font-semibold">
                    {activeContent.patent2.productDesc}
                  </p>
                </div>

                {/* Uniqueness card with elegant border */}
                <div className="bg-soltex-red/5 border-l-4 border-soltex-red p-5 rounded-r-xl shadow-sm">
                  <h4 className="font-black text-xs uppercase tracking-wider text-soltex-red mb-2">
                    {activeContent.patent2.uniqTitle} ({activeContent.patent2.num})
                  </h4>
                  <p className="text-xs text-soltex-graphite font-semibold leading-relaxed">
                    {activeContent.patent2.uniqDesc}
                  </p>
                </div>

                {/* Technology bullets */}
                <div className="space-y-4 pt-4 border-t border-soltex-border">
                  {activeContent.patent2.bullets.map((b, idx) => (
                    <div key={idx} className="flex gap-3.5 items-start">
                      <div className="w-7 h-7 rounded bg-soltex-graphite/5 text-soltex-graphite flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        {idx === 0 ? <ShieldCheck className="w-4 h-4 text-soltex-steel" /> : idx === 1 ? <Zap className="w-4 h-4 text-soltex-steel" /> : <Settings className="w-4 h-4 text-soltex-steel" />}
                      </div>
                      <div>
                        <h5 className="font-black text-xs uppercase tracking-tight text-soltex-graphite mb-0.5">{b.title}</h5>
                        <p className="text-xs text-soltex-steel leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selector for Gallery */}
              <div className="mt-8 space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-soltex-steel block mb-1">
                  {lang === 'ru' ? 'Промышленная фотогалерея технологии' : lang === 'zh' ? '示范工厂现场工业写实' : 'Industrial Process Gallery'}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`h-16 sm:h-20 md:h-24 lg:h-16 xl:h-20 rounded-lg overflow-hidden relative cursor-pointer transition-all duration-300 border-2 ${
                        activePhotoIdx === idx ? 'border-soltex-red scale-[1.03] shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Interactive Photo Display */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-soltex-border rounded-2xl overflow-hidden shadow-xl flex flex-col h-full justify-between">
                <div className="relative aspect-[4/3] bg-soltex-graphite overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activePhotoIdx}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      src={galleryImages[activePhotoIdx].url}
                      alt={galleryImages[activePhotoIdx].title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                  <div className="absolute top-4 left-4 bg-soltex-graphite/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10">
                    <span className="text-white text-[10px] font-black uppercase tracking-wider">
                      PHOTO 0{activePhotoIdx + 1} / 03
                    </span>
                  </div>
                </div>
                <div className="p-5 md:p-6 bg-soltex-graphite text-white border-t border-white/5">
                  <h4 className="font-black text-sm uppercase tracking-wider text-soltex-red mb-1">
                    {galleryImages[activePhotoIdx].title}
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed font-semibold">
                    {galleryImages[activePhotoIdx].desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Section: Patent 1 (Premium Beautiful Styling) --- */}
        <div className="border-t border-soltex-border pt-16 mb-20">
          <SectionHeading
            subtitle={
              <div className="inline-flex items-center gap-3 bg-soltex-graphite px-4 py-2 rounded-xl border border-soltex-red/20 shadow-[0_0_15px_rgba(230,57,70,0.1)] mb-2">
                <span className="text-soltex-red font-black text-[11px] uppercase tracking-widest">{lang === 'ru' ? 'ПАТЕНТ №2' : lang === 'zh' ? '专利 №2' : 'PATENT №2'}</span>
                <span className="w-px h-4 bg-white/20"></span>
                <span className="text-white font-bold text-[10px] uppercase tracking-widest">{lang === 'ru' ? 'ЗАВОД В КАЗАХСТАНЕ' : lang === 'zh' ? '哈萨克斯坦示范工厂' : 'KAZAKHSTAN PLANT'}</span>
              </div>
            }
            title={activeContent.patent1.title}
          />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-12 items-stretch">
            {/* Left side: Information, details and bullets */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-soltex-red/5 text-soltex-red text-xs font-black uppercase rounded-lg tracking-widest mb-4 border border-soltex-red/10 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 animate-pulse" />
                    {lang === 'ru' ? 'Локация: Алматы, Казахстан' : lang === 'zh' ? '地理位置：哈萨克斯坦阿拉木图' : 'Location: Almaty, Kazakhstan'}
                  </div>
                  <h4 className="font-black text-xs uppercase tracking-wider text-soltex-steel mb-2">
                    {activeContent.patent1.productTitle}
                  </h4>
                  <p className="text-soltex-steel text-sm leading-relaxed font-semibold">
                    {activeContent.patent1.productDesc}
                  </p>
                </div>

                {/* Uniqueness card with elegant border */}
                <div className="bg-soltex-red/5 border-l-4 border-soltex-red p-5 rounded-r-xl shadow-sm">
                  <h4 className="font-black text-xs uppercase tracking-wider text-soltex-red mb-2">
                    {activeContent.patent1.uniqTitle} ({activeContent.patent1.num})
                  </h4>
                  <p className="text-xs text-soltex-graphite font-semibold leading-relaxed">
                    {activeContent.patent1.uniqDesc}
                  </p>
                </div>

                {/* Technology bullets */}
                <div className="space-y-4 pt-4 border-t border-soltex-border">
                  {activeContent.patent1.bullets.map((b, idx) => (
                    <div key={idx} className="flex gap-3.5 items-start">
                      <div className="w-7 h-7 rounded bg-soltex-red/5 text-soltex-red flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        {idx === 0 ? <Cpu className="w-4 h-4" /> : idx === 1 ? <Zap className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
                      </div>
                      <div>
                        <h5 className="font-black text-xs uppercase tracking-tight text-soltex-graphite mb-0.5">{b.title}</h5>
                        <p className="text-xs text-soltex-steel leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Large immersive color photograph display */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-soltex-border rounded-2xl overflow-hidden shadow-xl flex flex-col h-full justify-between group">
                <div className="relative aspect-[16/11] bg-soltex-graphite overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/d/1P1uu_GP0lm29QX6EqQ9-4PglgXuz5Bmo"
                    alt="Industrial Complex"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-[2s]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-soltex-graphite/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10">
                    <span className="text-white text-[10px] font-black uppercase tracking-wider">
                      {lang === 'ru' ? 'ПРОМЫШЛЕННЫЙ КОМПЛЕКС' : lang === 'zh' ? '工业化示范基地' : 'INDUSTRIAL COMPLEX'}
                    </span>
                  </div>
                </div>
                <div className="p-5 md:p-6 bg-soltex-graphite text-white border-t border-white/5">
                  <h4 className="font-black text-sm uppercase tracking-wider text-soltex-red mb-1">
                    {lang === 'ru' ? 'Промышленный комплекс глубокой переработки сои' : lang === 'zh' ? '大豆深加工示范基地' : 'Industrial Soy Deep Processing Complex'}
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed font-semibold">
                    {lang === 'ru'
                      ? 'Современное предприятие с уникальной запатентованной технологией ферментативного гидролиза соевого белка.'
                      : lang === 'zh'
                      ? '配备先进定向酶法水解工艺与蒸汽真空热冲击系统的现代化精深加工中心。'
                      : 'Modern facility equipped with patented enzymatic hydrolysis technology for premium soy protein isolation.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Intro Section (Moved here as 3rd block) --- */}
        <div className="border-t border-soltex-border pt-16 mb-20">
          <SectionHeading subtitle={tech.subtitle} title={tech.title} />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
            <div className="lg:col-span-7">
              <p className="text-soltex-steel text-base md:text-lg font-medium leading-relaxed mb-6">
                {tech.desc}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {techHighlights.map((hl, idx) => (
                  <div key={idx} className="bg-white border border-soltex-border p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-soltex-red/5 text-soltex-red rounded-lg flex items-center justify-center mb-3">
                      <hl.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-black text-xs uppercase tracking-wider text-soltex-graphite mb-1.5">{hl.title}</h4>
                    <p className="text-[11px] text-soltex-steel leading-relaxed">{hl.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/*<div className="lg:col-span-5 bg-soltex-graphite text-white p-6 md:p-8 rounded-2xl border border-white/10 relative overflow-hidden shadow-2xl">*/}
            {/*  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />*/}
            {/*  <span className="text-soltex-red text-[9px] font-bold uppercase tracking-widest block mb-1">SOLTEX DIGITAL TWIN</span>*/}
            {/*  <h3 className="text-lg font-black uppercase tracking-tight mb-3">*/}
            {/*    {lang === 'ru' ? 'Схема автоматизации' : lang === 'zh' ? 'SCADA 工业集成系统' : 'Process Control Framework'}*/}
            {/*  </h3>*/}
            {/*  <p className="text-xs text-white/70 leading-relaxed mb-5">*/}
            {/*    {lang === 'ru'*/}
            {/*      ? 'Все наши заводы поставляются с интегрированной цифровой моделью и полностью автоматизированной системой управления рецептурами.'*/}
            {/*      : lang === 'zh'*/}
            {/*      ? '我们交付的每一座精深加工工厂均搭载全套数字孪生模型及完全自动化的生产配方控制算法。'*/}
            {/*      : 'Every plant we build comes with an integrated digital twin process flow and completely automated batch recipe controls.'}*/}
            {/*  </p>*/}
            {/*  <div className="space-y-2.5">*/}
            {/*    {[*/}
            {/*      { label: lang === 'ru' ? 'Точность дозирования' : lang === 'zh' ? '高精度计量加料' : 'Batch Dosing Precision', val: '99.98%' },*/}
            {/*      { label: lang === 'ru' ? 'Экономия энергии (OPEX)' : lang === 'zh' ? '热能与综合能耗节约' : 'Thermal Energy Savings', val: 'до 30%' },*/}
            {/*      { label: lang === 'ru' ? 'Готовность оборудования' : lang === 'zh' ? '设备连续开工率' : 'Equipment Availability', val: '98.5%' }*/}
            {/*    ].map((item, i) => (*/}
            {/*      <div key={i} className="flex justify-between items-center text-xs border-b border-white/10 pb-2">*/}
            {/*        <span className="text-white/60 font-semibold">{item.label}</span>*/}
            {/*        <span className="font-mono text-soltex-red font-bold">{item.val}</span>*/}
            {/*      </div>*/}
            {/*    ))}*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialSubject={tech.ctaBtn} />
    </PageLayout>
  );
};

const ContactPage = () => {
  const { t } = useTranslation();

  const offices = (t.contact as any).offices || [];
  const { formData, loading, success, handleChange, handlePhoneAccept, handleSubmit } = useLeadForm();

  return (
    <PageLayout>
      <div className="px-6 md:px-10 max-w-7xl mx-auto py-16 md:py-20">
        <SectionHeading subtitle={t.contact.subtitle} title={t.contact.title} />

        {/* --- Global Offices Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          {offices.map((office, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-soltex-border rounded-xl p-6 md:p-8 flex flex-col justify-between hover:border-soltex-red hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
            >
              {/* Soft red background accent on hover */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-soltex-red/[0.02] rounded-full translate-x-12 -translate-y-12 group-hover:bg-soltex-red/[0.04] transition-all duration-500" />

              <div className="space-y-4">
                <span className="text-soltex-red text-[10px] font-black uppercase tracking-[0.2em] block">
                  {office.region}
                </span>

                <h3 className="text-2xl font-black uppercase tracking-tight text-soltex-graphite leading-tight">
                  {office.company}
                </h3>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-soltex-red shrink-0 mt-1" />
                    <p className="text-sm text-soltex-steel font-medium leading-snug">
                      {office.location}
                      {office.pc && <span className="block text-xs font-bold text-soltex-steel/60 mt-0.5">P.C. {office.pc}</span>}
                    </p>
                  </div>

                  {office.manager && (
                    <div className="flex items-start gap-3 pt-1 border-t border-soltex-border/50">
                      <div className="w-1.5 h-1.5 rounded-full bg-soltex-red shrink-0 mt-2" />
                      <div>
                        <span className="text-[9px] uppercase font-bold text-soltex-steel/50 tracking-widest block leading-none mb-0.5">Representative</span>
                        <p className="text-sm text-soltex-graphite font-bold">{office.manager}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2 pt-6 border-t border-soltex-border/50 mt-6">
                {office.phone && (
                  <a
                    href={`tel:${office.phone.replace(/[^+\d]/g, "")}`}
                    className="flex items-center gap-3 text-sm font-bold text-soltex-graphite hover:text-soltex-red transition-colors"
                  >
                    <Phone className="w-4 h-4 text-soltex-red shrink-0" />
                    <span>{office.phone}</span>
                  </a>
                )}

                {office.waPhone && (
                  <a
                    href={`https://wa.me/${office.waPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-bold text-green-600 hover:text-green-700 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-green-500 shrink-0" />
                    <span>WhatsApp Chat</span>
                  </a>
                )}

                <a
                  href={`mailto:${office.email}`}
                  className="flex items-center gap-3 text-sm font-bold text-soltex-graphite hover:text-soltex-red transition-colors"
                >
                  <Mail className="w-4 h-4 text-soltex-red shrink-0" />
                  <span className="break-all">{office.email}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Form Section --- */}
        <div className="bg-white border border-soltex-border grid lg:grid-cols-2 overflow-hidden shadow-2xl rounded-2xl">
          <div className="p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-soltex-border flex flex-col justify-between">
            <div>
              <span className="text-soltex-red text-[10px] font-black uppercase tracking-[0.3em] block mb-4">{t.contact.formLeft.badge}</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-soltex-graphite leading-none mb-6">
                {t.contact.formLeft.title}
              </h2>
              <p className="text-soltex-steel text-base md:text-lg font-medium leading-relaxed mb-8">
                {t.contact.formLeft.desc}
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-soltex-border/60">
              <p className="text-[10px] font-bold text-soltex-steel uppercase tracking-widest">{t.contact.formLeft.sla}</p>
              <div className="grid grid-cols-2 gap-4 text-xs font-bold text-soltex-graphite">
                <div className="bg-soltex-border/20 p-3 rounded-lg">
                  <span className="text-soltex-red block mb-1">{t.contact.formLeft.respLabel}</span>
                  <span>{t.contact.formLeft.respVal}</span>
                </div>
                <div className="bg-soltex-border/20 p-3 rounded-lg">
                  <span className="text-soltex-red block mb-1">{t.contact.formLeft.assignLabel}</span>
                  <span>{t.contact.formLeft.assignVal}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-soltex-graphite p-8 md:p-16 flex flex-col justify-center relative">
             <div className="absolute top-10 right-10 opacity-5 pointer-events-none">
                <Globe className="w-32 md:w-48 h-32 md:h-48 text-white" />
             </div>
             <h3 className="text-white text-xs font-bold uppercase tracking-[0.3em] mb-10 md:mb-12">{t.contact.formTitle}</h3>
             <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 relative z-10">
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{t.contact.formLabels.company}</label>
                   <input
                    id="organization"
                    type="text"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder={t.contact.formLabels.companyPlaceholder}
                    className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 text-white outline-none focus:border-soltex-red transition-all placeholder:text-white/20"
                  />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{t.contact.formLabels.person}</label>
                   <input
                    required
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.contact.formLabels.personPlaceholder}
                    className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 text-white outline-none focus:border-soltex-red transition-all placeholder:text-white/20"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{t.contact.formLabels.phone}</label>
                    <IMaskInput
                      required
                      mask="+{7} (000) 000-00-00"
                      value={formData.phone}
                      onAccept={handlePhoneAccept}
                      placeholder="+7 (___) ___-__-__"
                      className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 text-white outline-none focus:border-soltex-red transition-all placeholder:text-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{t.contact.formLabels.email}</label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.contact.formLabels.emailPlaceholder}
                      className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 text-white outline-none focus:border-soltex-red transition-all placeholder:text-white/20"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{t.contact.formLabels.message}</label>
                   <textarea
                    id="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder={t.contact.formLabels.messagePlaceholder}
                    className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 text-white outline-none focus:border-soltex-red transition-all h-24 md:h-32 resize-none placeholder:text-white/20"
                   ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading || success}
                  className="bg-white text-soltex-graphite hover:bg-soltex-red hover:text-white px-8 md:px-10 py-4 md:py-5 font-black uppercase text-xs tracking-[0.2em] transition-all cursor-pointer w-full md:w-fit disabled:opacity-70 disabled:cursor-not-allowed"
                >
                   {loading ? "Отправка..." : success ? "Отправлено ✓" : t.contact.formLabels.btn}
                </button>
             </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

const InlineRequestForm = () => {
  const { t, lang } = useTranslation();
  const [company, setCompany] = useState("");
  const [person, setPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!person || !phone) {
      alert(lang === 'ru' ? "Пожалуйста, укажите ваше имя и телефон!" : "Please provide your name and phone number!");
      return;
    }

    setIsSubmitting(true);
    try {
      const cleanPhone = `+7 ${phone}`;
      await api.post("/leads", {
        organization: company,
        name: person,
        phone: cleanPhone,
        email,
        comment: message,
      });
      setSubmitted(true);
      // reset form
      setCompany("");
      setPerson("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Ошибка отправки");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-soltex-light-gray overflow-hidden border-t border-soltex-border">
      <div className="max-w-7xl mx-auto">
        <div className="bg-soltex-graphite rounded-3xl overflow-hidden grid lg:grid-cols-2 shadow-2xl">
          <div className="p-8 md:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5 text-white">
            <div className="text-soltex-red font-bold text-[10px] uppercase tracking-[0.4em] mb-4 md:mb-6">{t.inlineForm?.badge || "LET'S BUILD"}</div>
            <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-6 md:mb-8 text-white">
              {t.inlineForm?.title || "Ready to scale your facility?"}
            </h2>
            <p className="text-white/60 text-base md:text-lg font-medium leading-relaxed max-w-sm">
              {t.inlineForm?.subtitle || "Leave a request and our engineers will contact you shortly."}
            </p>
            <div className="mt-8 md:mt-12 flex items-center gap-6 opacity-30">
               <div className="w-12 h-px bg-white" />
               <div className="text-[10px] font-bold uppercase tracking-widest leading-none">{t.inlineForm?.groupText || "SOLTEX GLOBAL EN"}</div>
            </div>
          </div>
          <div className="p-8 md:p-16 bg-soltex-graphite flex flex-col justify-center min-h-[400px]">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-8 bg-white/5 border border-white/10 rounded-2xl space-y-4"
              >
                <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-white font-black uppercase tracking-tight text-xl">
                  {lang === 'ru' ? 'Заявка отправлена!' : lang === 'zh' ? '申请已成功发送！' : 'Inquiry Sent!'}
                </h3>
                <p className="text-white/70 text-sm font-semibold max-w-xs mx-auto leading-relaxed">
                  {lang === 'ru'
                    ? 'Спасибо! Мы получили ваши данные и свяжемся с вами в ближайшее время.'
                    : lang === 'zh'
                    ? '谢谢！我们已收到您的联络信息，将尽快与您取得联系。'
                    : 'Thank you! We have received your request and will contact you shortly.'
                  }
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {lang === 'ru' ? 'Отправить еще раз' : lang === 'zh' ? '再次发送' : 'Send another inquiry'}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 relative z-10">
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{t.contact.formLabels.company}</label>
                     <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={t.contact.formLabels.companyPlaceholder}
                      className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 text-white outline-none focus:border-soltex-red transition-all placeholder:text-white/20 text-sm font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{t.contact.formLabels.person} *</label>
                     <input
                      type="text"
                      value={person}
                      onChange={(e) => setPerson(e.target.value)}
                      placeholder={t.contact.formLabels.personPlaceholder}
                      className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 text-white outline-none focus:border-soltex-red transition-all placeholder:text-white/20 text-sm font-semibold"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{t.contact.formLabels.phone} *</label>
                      <IMaskInput
                        mask="+{7} (000) 000-00-00"
                        placeholder="+7 (___) ___-__-__"
                        value={phone}
                        onAccept={(val: string) => setPhone(val)}
                        className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 text-white outline-none focus:border-soltex-red transition-all placeholder:text-white/20 text-sm font-semibold"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{t.contact.formLabels.email}</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.contact.formLabels.emailPlaceholder}
                        className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 text-white outline-none focus:border-soltex-red transition-all placeholder:text-white/20 text-sm font-semibold"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{t.contact.formLabels.message}</label>
                     <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.contact.formLabels.messagePlaceholder}
                      className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 text-white outline-none focus:border-soltex-red transition-all h-24 md:h-32 resize-none placeholder:text-white/20 text-sm font-semibold"
                     ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-soltex-red hover:bg-white hover:text-soltex-graphite text-white py-4 md:py-6 rounded-2xl font-black uppercase text-xs md:text-sm tracking-widest transition-all shadow-xl active:scale-[0.98] disabled:bg-soltex-steel disabled:text-white cursor-pointer"
                  >
                     {isSubmitting ? (lang === 'ru' ? 'Отправка...' : 'Sending...') : t.contact.formLabels.btn}
                  </button>
               </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const location = useLocation();

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div className="min-h-screen selection:bg-soltex-red selection:text-white relative bg-soltex-light-gray font-sans overflow-x-hidden">
        <ScrollToTop />
        <Navbar />

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/tech" element={<TechPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
        <VerticalRail />

        {/* --- WhatsApp Floating Widget --- */}
        <div className="fixed bottom-6 right-6 z-[95] flex flex-col items-end">
          <AnimatePresence>
            {isWhatsAppOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className="bg-white border border-soltex-border rounded-2xl shadow-2xl p-5 w-80 mb-4 overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-soltex-border pb-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-black text-xs uppercase tracking-wider text-soltex-graphite">SOLTEX SUPPORT</h4>
                      <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider">{lang === 'ru' ? 'В сети' : lang === 'zh' ? '在线' : 'Online'}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsWhatsAppOpen(false)}
                    className="text-soltex-steel/60 hover:text-soltex-red p-1 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-soltex-steel leading-relaxed mb-4 font-medium">
                  {lang === 'ru'
                    ? 'Здравствуйте! Как мы можем помочь вам с проектированием или технологиями EPCM?'
                    : lang === 'zh'
                    ? '您好！请问有什么关于工程设计或 EPCM 技术的问题，我们可以帮您解答？'
                    : 'Hello! How can we help you with engineering or EPCM technologies?'}
                </p>

                <a
                  href="https://wa.me/77071881888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-lg text-center font-black uppercase text-[11px] tracking-wider transition-all duration-300 block w-full shadow-lg shadow-green-500/10 active:scale-95"
                >
                  {lang === 'ru' ? 'Начать чат' : lang === 'zh' ? '开始对话' : 'Start Chat'}
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsWhatsAppOpen(!isWhatsAppOpen)}
            className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/20 hover:bg-green-600 active:scale-95 transition-all duration-300 relative group cursor-pointer"
            aria-label="WhatsApp support"
          >
            {/* Pulsing ring */}
            <span className="absolute -inset-1 rounded-full bg-green-500/30 animate-ping pointer-events-none group-hover:bg-green-500/40" />
            <MessageSquare className="w-7 h-7 relative z-10" />
          </button>
        </div>
      </div>
    </LanguageContext.Provider>
  );
}




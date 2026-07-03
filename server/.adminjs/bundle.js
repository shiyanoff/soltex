(function (React, adminjs, reactRouterDom, designSystem) {
    'use strict';

    function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

    var React__default = /*#__PURE__*/_interopDefault(React);

    const api = new adminjs.ApiClient();
    const Dashboard = () => {
      const [data, setData] = React.useState(null);
      React.useEffect(() => {
        api.getDashboard().then(res => {
          setData(res.data);
        });
      }, []);
      if (!data) return /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          padding: 20
        }
      }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...");
      return /*#__PURE__*/React__default.default.createElement("div", {
        style: wrapper
      }, /*#__PURE__*/React__default.default.createElement("h1", {
        style: title
      }, "\u0414\u0430\u0448\u0431\u043E\u0440\u0434"), /*#__PURE__*/React__default.default.createElement("div", {
        style: grid
      }, /*#__PURE__*/React__default.default.createElement(Card, {
        title: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438",
        value: data.categoriesCount,
        icon: /*#__PURE__*/React__default.default.createElement(ServiceIcon, null),
        color: "#C41E3A",
        resource: "Category"
      }), /*#__PURE__*/React__default.default.createElement(Card, {
        title: "\u041F\u0440\u043E\u0435\u043A\u0442\u044B",
        value: data.itemsCount,
        icon: /*#__PURE__*/React__default.default.createElement(WorkIcon, null),
        color: "#8B1E34",
        resource: "Item"
      }), /*#__PURE__*/React__default.default.createElement(Card, {
        title: "\u0417\u0430\u044F\u0432\u043A\u0438",
        value: data.leadsCount,
        icon: /*#__PURE__*/React__default.default.createElement(LeadIcon, null),
        color: "#D94A62",
        resource: "Lead"
      })));
    };
    const Card = ({
      title,
      value,
      icon,
      color,
      resource
    }) => {
      const navigate = reactRouterDom.useNavigate();
      return /*#__PURE__*/React__default.default.createElement("div", {
        onClick: () => navigate(`/admin/resources/${resource}`),
        style: {
          ...card,
          borderLeft: `6px solid ${color}`,
          cursor: "pointer"
        }
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: top
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          ...iconWrapper,
          background: `${color}20`
        }
      }, icon), /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          ...valueStyle,
          color
        }
      }, value)), /*#__PURE__*/React__default.default.createElement("div", {
        style: label
      }, title));
    };

    //////////////////////
    // 🔧 ИКОНКИ
    //////////////////////

    const ServiceIcon = () => /*#__PURE__*/React__default.default.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none"
    }, /*#__PURE__*/React__default.default.createElement("rect", {
      x: "3",
      y: "3",
      width: "7",
      height: "7",
      rx: "2",
      fill: "#C41E3A"
    }), /*#__PURE__*/React__default.default.createElement("rect", {
      x: "14",
      y: "3",
      width: "7",
      height: "7",
      rx: "2",
      fill: "#C41E3A"
    }), /*#__PURE__*/React__default.default.createElement("rect", {
      x: "3",
      y: "14",
      width: "7",
      height: "7",
      rx: "2",
      fill: "#C41E3A"
    }), /*#__PURE__*/React__default.default.createElement("rect", {
      x: "14",
      y: "14",
      width: "7",
      height: "7",
      rx: "2",
      fill: "#C41E3A"
    }));
    const WorkIcon = () => /*#__PURE__*/React__default.default.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none"
    }, /*#__PURE__*/React__default.default.createElement("rect", {
      x: "5",
      y: "3",
      width: "14",
      height: "18",
      rx: "2",
      stroke: "#8B1E34",
      strokeWidth: "2"
    }), /*#__PURE__*/React__default.default.createElement("path", {
      d: "M9 7H10",
      stroke: "#8B1E34",
      strokeWidth: "2",
      strokeLinecap: "round"
    }), /*#__PURE__*/React__default.default.createElement("path", {
      d: "M14 7H15",
      stroke: "#8B1E34",
      strokeWidth: "2",
      strokeLinecap: "round"
    }), /*#__PURE__*/React__default.default.createElement("path", {
      d: "M9 11H10",
      stroke: "#8B1E34",
      strokeWidth: "2",
      strokeLinecap: "round"
    }), /*#__PURE__*/React__default.default.createElement("path", {
      d: "M14 11H15",
      stroke: "#8B1E34",
      strokeWidth: "2",
      strokeLinecap: "round"
    }), /*#__PURE__*/React__default.default.createElement("path", {
      d: "M11 21V17H13V21",
      stroke: "#8B1E34",
      strokeWidth: "2"
    }));
    const LeadIcon = () => /*#__PURE__*/React__default.default.createElement("svg", {
      width: "20",
      height: "20",
      fill: "#D94A62",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React__default.default.createElement("path", {
      d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
    }));

    // СТИЛИ

    const wrapper = {
      padding: "40px",
      background: "#f8f8f8",
      minHeight: "100vh"
    };
    const title = {
      marginBottom: "30px",
      fontSize: "26px",
      fontWeight: 700,
      color: "#1E293B"
    };
    const grid = {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "20px"
    };
    const card = {
      flex: 1,
      padding: "24px",
      borderRadius: "14px",
      background: "#fff",
      boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      transition: "0.2s"
    };
    const top = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    };
    const iconWrapper = {
      width: "42px",
      height: "42px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    };
    const valueStyle = {
      fontSize: "28px",
      fontWeight: 700
    };
    const label = {
      fontSize: "14px"
    };

    const TopBar = props => {
      const [open, setOpen] = React.useState(false);
      const ref = React.useRef(null);
      const [admin] = adminjs.useCurrentAdmin();
      const {
        toggleSidebar
      } = props;

      // закрытие при клике вне
      React.useEffect(() => {
        const handleClick = e => {
          if (ref.current && !ref.current.contains(e.target)) {
            setOpen(false);
          }
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
      }, []);
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "white",
        px: "xl",
        py: "lg",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #E2E8F0",
        style: {
          position: "sticky",
          top: 0,
          zIndex: 100
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        alignItems: "center"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mr: "lg",
        display: ["block", "block", "block", "block", "none"],
        style: {
          cursor: "pointer",
          padding: "6px",
          borderRadius: "8px"
        },
        onClick: toggleSidebar
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
        icon: "Menu"
      })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        color: "grey60",
        style: {
          fontSize: "16px"
        }
      }, "\u041F\u0430\u043D\u0435\u043B\u044C \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        alignItems: "center"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        position: "relative",
        ref: ref
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        alignItems: "center",
        style: {
          cursor: "pointer",
          padding: "6px 10px",
          borderRadius: "10px",
          transition: "0.2s",
          gap: "4px"
        },
        onClick: () => setOpen(!open)
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        alignItems: "center",
        display: "flex",
        style: {
          gap: "8px"
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Avatar, {
        style: {
          background: "#96132b",
          color: "#fff"
        }
      }, admin?.username?.[0]?.toUpperCase() || "A"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        fontSize: "sm",
        fontWeight: "500"
      }, admin?.username)), /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
        icon: "ChevronDown"
      })), open && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        position: "absolute",
        top: "110%",
        right: 0,
        bg: "white",
        width: "180px",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        border: "1px solid #E2E8F0",
        p: "sm"
      }, /*#__PURE__*/React__default.default.createElement(DropdownItem, {
        icon: "LogOut",
        label: "\u0412\u044B\u0439\u0442\u0438",
        danger: true,
        onClick: () => {
          window.location.href = "/admin/logout";
        }
      })))));
    };
    const DropdownItem = ({
      icon,
      label,
      onClick,
      danger
    }) => /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      alignItems: "center",
      px: "md",
      py: "md",
      style: {
        cursor: "pointer",
        borderRadius: "10px",
        transition: "0.2s",
        color: danger ? "#DC2626" : "#1E293B",
        gap: "10px"
      },
      onClick: onClick,
      onMouseEnter: e => {
        e.currentTarget.style.background = "#F1F5F9";
      },
      onMouseLeave: e => {
        e.currentTarget.style.background = "transparent";
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
      icon: icon
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      fontSize: "sm"
    }, label));

    const gradientConfig = {
      angle: 135,
      colors: [{
        color: "#1A1A1A",
        stop: "0%"
      }]
    };
    const getGradient = () => {
      const stops = gradientConfig.colors.map(c => `${c.color} ${c.stop}`).join(", ");
      return `linear-gradient(${gradientConfig.angle}deg, ${stops})`;
    };
    const Login = props => {
      const {
        action,
        errorMessage
      } = props;
      const [email, setEmail] = React.useState("");
      const [password, setPassword] = React.useState("");
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          display: "flex",
          minHeight: "100vh",
          flexDirection: "row"
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        className: "login-left",
        style: {
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: getGradient(),
          position: "relative",
          color: "white"
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          textAlign: "left"
        }
      }, /*#__PURE__*/React__default.default.createElement("img", {
        src: "/logo.png",
        alt: "logo",
        style: {
          width: "400px",
          marginBottom: 20,
          borderRadius: "8px"
        }
      }), /*#__PURE__*/React__default.default.createElement("p", {
        style: {
          fontSize: 24,
          opacity: 0.8
        }
      }, "\u041F\u0430\u043D\u0435\u043B\u044C \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F"))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F8FAFC"
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          width: 360,
          padding: 32,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 20px 40px rgba(0,0,0,0.06)"
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
        style: {
          marginBottom: 16,
          fontSize: 24
        }
      }, "\u0412\u0445\u043E\u0434 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443"), /*#__PURE__*/React__default.default.createElement("form", {
        method: "post",
        action: action
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 16
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
        name: "email",
        placeholder: "\u041B\u043E\u0433\u0438\u043D",
        value: email,
        onChange: e => setEmail(e.target.value)
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
        name: "password",
        type: "password",
        placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C",
        value: password,
        onChange: e => setPassword(e.target.value)
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        type: "submit",
        variant: "primary",
        block: true
      }, "\u0412\u043E\u0439\u0442\u0438")), errorMessage && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mt: "md",
        color: "red"
      }, errorMessage)))), /*#__PURE__*/React__default.default.createElement("style", null, `
          @media (max-width: 768px) {
            .login-left {
              display: none !important;
            }
          }
        `));
    };

    const VideoUpload = ({
      property,
      record,
      onChange
    }) => {
      const [preview, setPreview] = React.useState(null);
      const currentVideo = preview || (record?.params?.videoFile ? record.params.videoFile : null);
      const handleChange = file => {
        if (!file) return;
        onChange({
          ...record,
          params: {
            ...record.params,
            [property.name]: [file]
          }
        });
        const url = URL.createObjectURL(file);
        setPreview(url);
      };
      const handleDrop = e => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        handleChange(file);
      };
      const handleSelect = e => {
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
            videoFile: null
          }
        });
      };
      const inputId = `upload-${property.path}`;
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginBottom: "xl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Видео файл"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        onClick: () => document.getElementById(inputId)?.click(),
        onDrop: handleDrop,
        onDragOver: e => e.preventDefault(),
        style: {
          border: "2px dashed #E0E0E0FF",
          borderRadius: 12,
          padding: 20,
          textAlign: "center",
          background: "#fafafa",
          cursor: "pointer"
        }
      }, /*#__PURE__*/React__default.default.createElement("p", {
        style: {
          marginBottom: 8
        }
      }, "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0432\u0438\u0434\u0435\u043E \u0441\u044E\u0434\u0430"), /*#__PURE__*/React__default.default.createElement("p", {
        style: {
          fontSize: 12,
          color: "#64748B"
        }
      }, "\u0438\u043B\u0438"), /*#__PURE__*/React__default.default.createElement("label", {
        style: {
          display: "inline-block",
          marginTop: 8,
          padding: "6px 12px",
          background: "#e7e7e7",
          color: "black",
          borderRadius: 6,
          cursor: "pointer"
        }
      }, "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0444\u0430\u0439\u043B", /*#__PURE__*/React__default.default.createElement("input", {
        type: "file",
        accept: "video/mp4,video/webm,video/quicktime",
        onChange: handleSelect,
        style: {
          display: "none"
        }
      })), /*#__PURE__*/React__default.default.createElement("p", {
        style: {
          marginTop: 10,
          fontSize: 12,
          color: "#94A3B8"
        }
      }, "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F: mp4, webm, mov")), currentVideo && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mt: "md",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #E5E7EB",
          borderRadius: 12,
          padding: 12,
          background: "#FFFFFF"
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 12
        }
      }, /*#__PURE__*/React__default.default.createElement("video", {
        src: currentVideo,
        style: {
          width: 80,
          height: 50,
          objectFit: "cover",
          borderRadius: 6
        }
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "13px"
      }, record?.params?.videoFile || "video.mp4")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        onClick: removeFile,
        style: {
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid #E5E7EB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer"
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
        icon: "X"
      }))));
    };

    const BASE_URL$1 = window.location.origin + "/api";
    const getLabel = property => {
      const map = {
        uploadImage: "Картинка",
        uploadIcon: "Иконка"
      };
      return map[property.name] || property.label;
    };
    const ImageUpload = ({
      property,
      record,
      onChange
    }) => {
      const [preview, setPreview] = React.useState(null);
      const keyMap = {
        uploadImage: Object.keys(record?.params || {}).find(key => key.toLowerCase().includes("image") && key !== "uploadImage") || "image",
        uploadIcon: "icon"
      };
      const rawUpload = record?.params?.[property.name];
      const rawStored = record?.params?.[keyMap[property.name]];
      const value = Array.isArray(rawUpload) ? rawUpload[0] : rawStored;
      const getImageSrc = () => {
        if (preview) return preview;
        if (!value) return null;
        if (typeof value === "string") {
          return value.startsWith("http") ? value : `${BASE_URL$1}${value}`;
        }
        if (value instanceof File) {
          return URL.createObjectURL(value);
        }
        return null;
      };
      const currentImage = getImageSrc();
      const handleChange = file => {
        if (!file) return;
        onChange({
          ...record,
          params: {
            ...record.params,
            [property.name]: [file]
          }
        });
        const url = URL.createObjectURL(file);
        setPreview(url);
      };
      const handleDrop = e => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        handleChange(file);
      };
      const handleSelect = e => {
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
            [key]: null
          }
        });
      };
      const inputId = `upload-${property.path}`;
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginBottom: "xl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, getLabel(property)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        onClick: () => document.getElementById(inputId)?.click(),
        onDrop: handleDrop,
        onDragOver: e => e.preventDefault(),
        style: {
          border: "2px dashed #E0E0E0FF",
          borderRadius: 12,
          padding: 20,
          textAlign: "center",
          background: "#fafafa",
          cursor: "pointer"
        }
      }, /*#__PURE__*/React__default.default.createElement("p", {
        style: {
          marginBottom: 8
        }
      }, "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0441\u044E\u0434\u0430"), /*#__PURE__*/React__default.default.createElement("p", {
        style: {
          fontSize: 12,
          color: "#64748B"
        }
      }, "\u0438\u043B\u0438"), /*#__PURE__*/React__default.default.createElement("label", {
        style: {
          display: "inline-block",
          marginTop: 8,
          padding: "6px 12px",
          background: "#e7e7e7",
          color: "black",
          borderRadius: 6,
          cursor: "pointer"
        }
      }, "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0444\u0430\u0439\u043B", /*#__PURE__*/React__default.default.createElement("input", {
        type: "file",
        accept: "image/png,image/jpeg,image/svg+xml,image/webp",
        onChange: handleSelect,
        style: {
          display: "none"
        }
      })), /*#__PURE__*/React__default.default.createElement("p", {
        style: {
          marginTop: 10,
          fontSize: 12,
          color: "#94A3B8"
        }
      }, "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F: PNG, SVG, JPG, WEBP")), currentImage && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mt: "md",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #E5E7EB",
          borderRadius: 12,
          padding: 12,
          background: "#FFFFFF"
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 12
        }
      }, /*#__PURE__*/React__default.default.createElement("img", {
        src: currentImage,
        alt: "preview",
        style: {
          width: 50,
          height: 50,
          objectFit: "contain",
          borderRadius: 6,
          background: "#F3F4F6",
          padding: 6
        }
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "13px"
      }, typeof value === "string" ? value.split('/').pop() : value?.name || "image.png")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        onClick: removeFile,
        style: {
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid #E5E7EB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer"
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
        icon: "X"
      }))));
    };

    const BASE_URL = window.location.origin + "/api";
    const getYouTubeId = url => {
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
    const isYouTube = url => url.includes("youtube.com") || url.includes("youtu.be");
    const FilePreview = ({
      record,
      property,
      where
    }) => {
      const raw = record?.params?.[property.name];
      if (!raw) {
        return /*#__PURE__*/React__default.default.createElement("span", {
          style: {
            color: "#9CA3AF"
          }
        }, "\u2014");
      }
      const src = raw.startsWith("http") ? raw : `${BASE_URL}${raw}`;
      const isImage = /\.(jpg|jpeg|png|webp|svg)$/i.test(src);
      const isVideo = /\.(mp4|webm|mov)$/i.test(src);
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          display: "flex",
          alignItems: "center",
          paddingBottom: where === "show" ? 24 : 0
        }
      }, isImage && /*#__PURE__*/React__default.default.createElement("img", {
        src: src,
        alt: "file",
        style: {
          width: 32,
          height: 32,
          objectFit: "cover",
          borderRadius: "50%",
          background: "#F3F4F6"
        }
      }), isVideo && /*#__PURE__*/React__default.default.createElement("video", {
        src: src,
        muted: true,
        style: {
          width: 32,
          height: 32,
          objectFit: "cover",
          borderRadius: "50%",
          background: "#000"
        }
      }), !isImage && !isVideo && isYouTube(src) && (() => {
        const id = getYouTubeId(src);
        if (!id) return null;
        const thumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
        return /*#__PURE__*/React__default.default.createElement("a", {
          href: src,
          target: "_blank"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          style: {
            position: "relative",
            width: 32,
            height: 32
          }
        }, /*#__PURE__*/React__default.default.createElement("img", {
          src: thumb,
          alt: "youtube",
          style: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%"
          }
        }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          style: {
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 10
          }
        }, "\u25B6")));
      })(), !isImage && !isVideo && !isYouTube(src) && /*#__PURE__*/React__default.default.createElement("a", {
        href: src,
        target: "_blank"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "#F1F5F9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
        icon: "Globe"
      }))));
    };

    const Edit = ({ property, record, onChange }) => {
        const { translateProperty } = adminjs.useTranslation();
        const { params } = record;
        const { custom } = property;
        const path = adminjs.flat.get(params, custom.filePathProperty);
        const key = adminjs.flat.get(params, custom.keyProperty);
        const file = adminjs.flat.get(params, custom.fileProperty);
        const [originalKey, setOriginalKey] = React.useState(key);
        const [filesToUpload, setFilesToUpload] = React.useState([]);
        React.useEffect(() => {
            // it means means that someone hit save and new file has been uploaded
            // in this case fliesToUpload should be cleared.
            // This happens when user turns off redirect after new/edit
            if ((typeof key === 'string' && key !== originalKey)
                || (typeof key !== 'string' && !originalKey)
                || (typeof key !== 'string' && Array.isArray(key) && key.length !== originalKey.length)) {
                setOriginalKey(key);
                setFilesToUpload([]);
            }
        }, [key, originalKey]);
        const onUpload = (files) => {
            setFilesToUpload(files);
            onChange(custom.fileProperty, files);
        };
        const handleRemove = () => {
            onChange(custom.fileProperty, null);
        };
        const handleMultiRemove = (singleKey) => {
            const index = (adminjs.flat.get(record.params, custom.keyProperty) || []).indexOf(singleKey);
            const filesToDelete = adminjs.flat.get(record.params, custom.filesToDeleteProperty) || [];
            if (path && path.length > 0) {
                const newPath = path.map((currentPath, i) => (i !== index ? currentPath : null));
                let newParams = adminjs.flat.set(record.params, custom.filesToDeleteProperty, [...filesToDelete, index]);
                newParams = adminjs.flat.set(newParams, custom.filePathProperty, newPath);
                onChange({
                    ...record,
                    params: newParams,
                });
            }
            else {
                // eslint-disable-next-line no-console
                console.log('You cannot remove file when there are no uploaded files yet');
            }
        };
        return (React__default.default.createElement(designSystem.FormGroup, null,
            React__default.default.createElement(designSystem.Label, null, translateProperty(property.label, property.resourceId)),
            React__default.default.createElement(designSystem.DropZone, { onChange: onUpload, multiple: custom.multiple, validate: {
                    mimeTypes: custom.mimeTypes,
                    maxSize: custom.maxSize,
                }, files: filesToUpload }),
            !custom.multiple && key && path && !filesToUpload.length && file !== null && (React__default.default.createElement(designSystem.DropZoneItem, { filename: key, src: path, onRemove: handleRemove })),
            custom.multiple && key && key.length && path ? (React__default.default.createElement(React__default.default.Fragment, null, key.map((singleKey, index) => {
                // when we remove items we set only path index to nulls.
                // key is still there. This is because
                // we have to maintain all the indexes. So here we simply filter out elements which
                // were removed and display only what was left
                const currentPath = path[index];
                return currentPath ? (React__default.default.createElement(designSystem.DropZoneItem, { key: singleKey, filename: singleKey, src: path[index], onRemove: () => handleMultiRemove(singleKey) })) : '';
            }))) : ''));
    };

    const AudioMimeTypes = [
        'audio/aac',
        'audio/midi',
        'audio/x-midi',
        'audio/mpeg',
        'audio/ogg',
        'application/ogg',
        'audio/opus',
        'audio/wav',
        'audio/webm',
        'audio/3gpp2',
    ];
    const ImageMimeTypes = [
        'image/bmp',
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/svg+xml',
        'image/vnd.microsoft.icon',
        'image/tiff',
        'image/webp',
    ];

    // eslint-disable-next-line import/no-extraneous-dependencies
    const SingleFile = (props) => {
        const { name, path, mimeType, width } = props;
        if (path && path.length) {
            if (mimeType && ImageMimeTypes.includes(mimeType)) {
                return (React__default.default.createElement("img", { src: path, style: { maxHeight: width, maxWidth: width }, alt: name }));
            }
            if (mimeType && AudioMimeTypes.includes(mimeType)) {
                return (React__default.default.createElement("audio", { controls: true, src: path },
                    "Your browser does not support the",
                    React__default.default.createElement("code", null, "audio"),
                    React__default.default.createElement("track", { kind: "captions" })));
            }
        }
        return (React__default.default.createElement(designSystem.Box, null,
            React__default.default.createElement(designSystem.Button, { as: "a", href: path, ml: "default", size: "sm", rounded: true, target: "_blank" },
                React__default.default.createElement(designSystem.Icon, { icon: "DocumentDownload", color: "white", mr: "default" }),
                name)));
    };
    const File$1 = ({ width, record, property }) => {
        const { custom } = property;
        let path = adminjs.flat.get(record?.params, custom.filePathProperty);
        if (!path) {
            return null;
        }
        const name = adminjs.flat.get(record?.params, custom.fileNameProperty ? custom.fileNameProperty : custom.keyProperty);
        const mimeType = custom.mimeTypeProperty
            && adminjs.flat.get(record?.params, custom.mimeTypeProperty);
        if (!property.custom.multiple) {
            if (custom.opts && custom.opts.baseUrl) {
                path = `${custom.opts.baseUrl}/${name}`;
            }
            return (React__default.default.createElement(SingleFile, { path: path, name: name, width: width, mimeType: mimeType }));
        }
        if (custom.opts && custom.opts.baseUrl) {
            const baseUrl = custom.opts.baseUrl || '';
            path = path.map((singlePath, index) => `${baseUrl}/${name[index]}`);
        }
        return (React__default.default.createElement(React__default.default.Fragment, null, path.map((singlePath, index) => (React__default.default.createElement(SingleFile, { key: singlePath, path: singlePath, name: name[index], width: width, mimeType: mimeType[index] })))));
    };

    const List = (props) => (React__default.default.createElement(File$1, { width: 100, ...props }));

    const Show = (props) => {
        const { property } = props;
        const { translateProperty } = adminjs.useTranslation();
        return (React__default.default.createElement(designSystem.FormGroup, null,
            React__default.default.createElement(designSystem.Label, null, translateProperty(property.label, property.resourceId)),
            React__default.default.createElement(File$1, { width: "100%", ...props })));
    };

    AdminJS.UserComponents = {};
    AdminJS.UserComponents.Dashboard = Dashboard;
    AdminJS.UserComponents.TopBar = TopBar;
    AdminJS.UserComponents.Login = Login;
    AdminJS.UserComponents.VideoUpload = VideoUpload;
    AdminJS.UserComponents.ImageUpload = ImageUpload;
    AdminJS.UserComponents.FilePreview = FilePreview;
    AdminJS.UserComponents.UploadEditComponent = Edit;
    AdminJS.UserComponents.UploadListComponent = List;
    AdminJS.UserComponents.UploadShowComponent = Show;

})(React, AdminJS, ReactRouterDOM, AdminJSDesignSystem);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYWRtaW4vZGFzaGJvYXJkLnRzeCIsIi4uL3NyYy9hZG1pbi90b3BiYXIudHN4IiwiLi4vc3JjL2FkbWluL2xvZ2luLnRzeCIsIi4uL3NyYy9hZG1pbi92aWRlby11cGxvYWQudHN4IiwiLi4vc3JjL2FkbWluL2ltYWdlLXVwbG9hZC50c3giLCIuLi9zcmMvYWRtaW4vZmlsZS1wcmV2aWV3LnRzeCIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRFZGl0Q29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS90eXBlcy9taW1lLXR5cGVzLnR5cGUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvZmlsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRMaXN0Q29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZFNob3dDb21wb25lbnQuanMiLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQXBpQ2xpZW50IH0gZnJvbSBcImFkbWluanNcIjtcbmltcG9ydCB7IHVzZU5hdmlnYXRlIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcblxuY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xuXG5jb25zdCBEYXNoYm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGU8YW55PihudWxsKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGFwaS5nZXREYXNoYm9hcmQoKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIHNldERhdGEocmVzLmRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9LCBbXSk7XG5cbiAgICBpZiAoIWRhdGEpIHJldHVybiA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6IDIwIH19PtCX0LDQs9GA0YPQt9C60LAuLi48L2Rpdj47XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHN0eWxlPXt3cmFwcGVyfT5cbiAgICAgICAgICAgIDxoMSBzdHlsZT17dGl0bGV9PtCU0LDRiNCx0L7RgNC0PC9oMT5cblxuICAgICAgICAgICAgPGRpdiBzdHlsZT17Z3JpZH0+XG4gICAgICAgICAgICAgICAgPENhcmRcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCLQmtCw0YLQtdCz0L7RgNC40LhcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZGF0YS5jYXRlZ29yaWVzQ291bnR9XG4gICAgICAgICAgICAgICAgICAgIGljb249ezxTZXJ2aWNlSWNvbiAvPn1cbiAgICAgICAgICAgICAgICAgICAgY29sb3I9XCIjQzQxRTNBXCJcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2U9XCJDYXRlZ29yeVwiXG4gICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIDxDYXJkXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPVwi0J/RgNC+0LXQutGC0YtcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZGF0YS5pdGVtc0NvdW50fVxuICAgICAgICAgICAgICAgICAgICBpY29uPXs8V29ya0ljb24gLz59XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiIzhCMUUzNFwiXG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlPVwiSXRlbVwiXG4gICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIDxDYXJkXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPVwi0JfQsNGP0LLQutC4XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2RhdGEubGVhZHNDb3VudH1cbiAgICAgICAgICAgICAgICAgICAgaWNvbj17PExlYWRJY29uIC8+fVxuICAgICAgICAgICAgICAgICAgICBjb2xvcj1cIiNEOTRBNjJcIlxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZT1cIkxlYWRcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG5cbmNvbnN0IENhcmQgPSAoeyB0aXRsZSwgdmFsdWUsIGljb24sIGNvbG9yLCByZXNvdXJjZSB9OiBhbnkpID0+IHtcbiAgICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZShgL2FkbWluL3Jlc291cmNlcy8ke3Jlc291cmNlfWApfVxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAuLi5jYXJkLFxuICAgICAgICAgICAgICAgIGJvcmRlckxlZnQ6IGA2cHggc29saWQgJHtjb2xvcn1gLFxuICAgICAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gICAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt0b3B9PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uaWNvbldyYXBwZXIsIGJhY2tncm91bmQ6IGAke2NvbG9yfTIwYCB9fT5cbiAgICAgICAgICAgICAgICAgICAge2ljb259XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnZhbHVlU3R5bGUsIGNvbG9yIH19Pnt2YWx1ZX08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXtsYWJlbH0+e3RpdGxlfTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8g8J+UpyDQmNCa0J7QndCa0Jhcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY29uc3QgU2VydmljZUljb24gPSAoKSA9PiAoXG5cbiAgICA8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiPlxuXG4gICAgICAgIDxyZWN0IHg9XCIzXCIgeT1cIjNcIiB3aWR0aD1cIjdcIiBoZWlnaHQ9XCI3XCIgcng9XCIyXCIgZmlsbD1cIiNDNDFFM0FcIi8+XG5cbiAgICAgICAgPHJlY3QgeD1cIjE0XCIgeT1cIjNcIiB3aWR0aD1cIjdcIiBoZWlnaHQ9XCI3XCIgcng9XCIyXCIgZmlsbD1cIiNDNDFFM0FcIi8+XG5cbiAgICAgICAgPHJlY3QgeD1cIjNcIiB5PVwiMTRcIiB3aWR0aD1cIjdcIiBoZWlnaHQ9XCI3XCIgcng9XCIyXCIgZmlsbD1cIiNDNDFFM0FcIi8+XG5cbiAgICAgICAgPHJlY3QgeD1cIjE0XCIgeT1cIjE0XCIgd2lkdGg9XCI3XCIgaGVpZ2h0PVwiN1wiIHJ4PVwiMlwiIGZpbGw9XCIjQzQxRTNBXCIvPlxuXG4gICAgPC9zdmc+XG5cbik7XG5cbmNvbnN0IFdvcmtJY29uID0gKCkgPT4gKFxuICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCI+XG4gICAgICAgIDxyZWN0XG4gICAgICAgICAgICB4PVwiNVwiXG4gICAgICAgICAgICB5PVwiM1wiXG4gICAgICAgICAgICB3aWR0aD1cIjE0XCJcbiAgICAgICAgICAgIGhlaWdodD1cIjE4XCJcbiAgICAgICAgICAgIHJ4PVwiMlwiXG4gICAgICAgICAgICBzdHJva2U9XCIjOEIxRTM0XCJcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMlwiXG4gICAgICAgIC8+XG4gICAgICAgIDxwYXRoIGQ9XCJNOSA3SDEwXCIgc3Ryb2tlPVwiIzhCMUUzNFwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiLz5cbiAgICAgICAgPHBhdGggZD1cIk0xNCA3SDE1XCIgc3Ryb2tlPVwiIzhCMUUzNFwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiLz5cbiAgICAgICAgPHBhdGggZD1cIk05IDExSDEwXCIgc3Ryb2tlPVwiIzhCMUUzNFwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiLz5cbiAgICAgICAgPHBhdGggZD1cIk0xNCAxMUgxNVwiIHN0cm9rZT1cIiM4QjFFMzRcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIi8+XG4gICAgICAgIDxwYXRoIGQ9XCJNMTEgMjFWMTdIMTNWMjFcIiBzdHJva2U9XCIjOEIxRTM0XCIgc3Ryb2tlV2lkdGg9XCIyXCIvPlxuICAgIDwvc3ZnPlxuKTtcblxuY29uc3QgTGVhZEljb24gPSAoKSA9PiAoXG4gICAgPHN2ZyB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiBmaWxsPVwiI0Q5NEE2MlwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cbiAgICAgICAgPHBhdGggZD1cIk0yMSAxNWEyIDIgMCAwIDEtMiAySDdsLTQgNFY1YTIgMiAwIDAgMSAyLTJoMTRhMiAyIDAgMCAxIDIgMnpcIi8+XG4gICAgPC9zdmc+XG4pO1xuXG4vLyDQodCi0JjQm9CYXG5cbmNvbnN0IHdyYXBwZXIgPSB7XG4gICAgcGFkZGluZzogXCI0MHB4XCIsXG4gICAgYmFja2dyb3VuZDogXCIjZjhmOGY4XCIsXG4gICAgbWluSGVpZ2h0OiBcIjEwMHZoXCIsXG59O1xuXG5jb25zdCB0aXRsZSA9IHtcbiAgICBtYXJnaW5Cb3R0b206IFwiMzBweFwiLFxuICAgIGZvbnRTaXplOiBcIjI2cHhcIixcbiAgICBmb250V2VpZ2h0OiA3MDAsXG4gICAgY29sb3I6IFwiIzFFMjkzQlwiLFxufTtcblxuY29uc3QgZ3JpZCA9IHtcbiAgICBkaXNwbGF5OiBcImdyaWRcIixcbiAgICBncmlkVGVtcGxhdGVDb2x1bW5zOiBcInJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDI4MHB4LCAxZnIpKVwiLFxuICAgIGdhcDogXCIyMHB4XCIsXG59O1xuXG5jb25zdCBjYXJkID0ge1xuICAgIGZsZXg6IDEsXG4gICAgcGFkZGluZzogXCIyNHB4XCIsXG4gICAgYm9yZGVyUmFkaXVzOiBcIjE0cHhcIixcbiAgICBiYWNrZ3JvdW5kOiBcIiNmZmZcIixcbiAgICBib3hTaGFkb3c6IFwiMCA0cHggMTJweCByZ2JhKDAsMCwwLDAuMDQpXCIsXG4gICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIiBhcyBjb25zdCxcbiAgICBnYXA6IFwiMTZweFwiLFxuICAgIHRyYW5zaXRpb246IFwiMC4yc1wiLFxufTtcblxuY29uc3QgdG9wID0ge1xuICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgIGp1c3RpZnlDb250ZW50OiBcInNwYWNlLWJldHdlZW5cIixcbiAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxufTtcblxuY29uc3QgaWNvbldyYXBwZXIgPSB7XG4gICAgd2lkdGg6IFwiNDJweFwiLFxuICAgIGhlaWdodDogXCI0MnB4XCIsXG4gICAgYm9yZGVyUmFkaXVzOiBcIjEwcHhcIixcbiAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxufTtcblxuY29uc3QgdmFsdWVTdHlsZSA9IHtcbiAgICBmb250U2l6ZTogXCIyOHB4XCIsXG4gICAgZm9udFdlaWdodDogNzAwLFxufTtcblxuY29uc3QgbGFiZWwgPSB7XG4gICAgZm9udFNpemU6IFwiMTRweFwiLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGFzaGJvYXJkO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VSZWYsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQm94LCBJY29uLCBBdmF0YXIgfSBmcm9tIFwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO1xuaW1wb3J0IHt1c2VDdXJyZW50QWRtaW59IGZyb20gXCJhZG1pbmpzXCI7XG5cbmNvbnN0IFRvcEJhciA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCByZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xuICAgIGNvbnN0IFthZG1pbl0gPSB1c2VDdXJyZW50QWRtaW4oKTtcblxuICAgIGNvbnN0IHsgdG9nZ2xlU2lkZWJhciB9ID0gcHJvcHM7XG5cbiAgICAvLyDQt9Cw0LrRgNGL0YLQuNC1INC/0YDQuCDQutC70LjQutC1INCy0L3QtVxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZUNsaWNrID0gKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlZi5jdXJyZW50ICYmICFyZWYuY3VycmVudC5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrKTtcbiAgICAgICAgcmV0dXJuICgpID0+IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGljayk7XG4gICAgfSwgW10pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPEJveFxuICAgICAgICAgICAgYmc9XCJ3aGl0ZVwiXG4gICAgICAgICAgICBweD1cInhsXCJcbiAgICAgICAgICAgIHB5PVwibGdcIlxuICAgICAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJzcGFjZS1iZXR3ZWVuXCJcbiAgICAgICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxuICAgICAgICAgICAgYm9yZGVyQm90dG9tPVwiMXB4IHNvbGlkICNFMkU4RjBcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJzdGlja3lcIixcbiAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgekluZGV4OiAxMDAsXG4gICAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgICB7LyogTEVGVCAqL31cbiAgICAgICAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBhbGlnbkl0ZW1zPVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgey8qIE1FTlUgQlVUVE9OICovfVxuICAgICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICAgICAgbXI9XCJsZ1wiXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk9e1tcImJsb2NrXCIsIFwiYmxvY2tcIiwgXCJibG9ja1wiLCBcImJsb2NrXCIsIFwibm9uZVwiXX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjhweFwiLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0b2dnbGVTaWRlYmFyfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPEljb24gaWNvbj1cIk1lbnVcIiAvPlxuICAgICAgICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAgICAgICAgPEJveCBjb2xvcj1cImdyZXk2MFwiIHN0eWxlPXt7IGZvbnRTaXplOiBcIjE2cHhcIiB9fT5cbiAgICAgICAgICAgICAgICAgICAg0J/QsNC90LXQu9GMINGD0L/RgNCw0LLQu9C10L3QuNGPXG4gICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgICAgey8qIFJJR0hUICovfVxuICAgICAgICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGFsaWduSXRlbXM9XCJjZW50ZXJcIj5cblxuICAgICAgICAgICAgICAgIHsvKiBVU0VSICsgRFJPUERPV04gKi99XG4gICAgICAgICAgICAgICAgPEJveCBwb3NpdGlvbj1cInJlbGF0aXZlXCIgcmVmPXtyZWZ9PlxuICAgICAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5PVwiZmxleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiBcInBvaW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjZweCAxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBcIjAuMnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXA6IFwiNHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRPcGVuKCFvcGVuKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJveCBhbGlnbkl0ZW1zPVwiY2VudGVyXCIgZGlzcGxheT1cImZsZXhcIiBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhcDogXCI4cHhcIixcblxuICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEF2YXRhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCIjOTYxMzJiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YWRtaW4/LnVzZXJuYW1lPy5bMF0/LnRvVXBwZXJDYXNlKCkgfHwgXCJBXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdmF0YXI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm94IGZvbnRTaXplPVwic21cIiBmb250V2VpZ2h0PVwiNTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthZG1pbj8udXNlcm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gaWNvbj1cIkNoZXZyb25Eb3duXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgICAgICAgICAgICAgey8qIERST1BET1dOICovfVxuICAgICAgICAgICAgICAgICAgICB7b3BlbiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb249XCJhYnNvbHV0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wPVwiMTEwJVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ9ezB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmc9XCJ3aGl0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9XCIxODBweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzPVwiMTJweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93PVwiMCAxMHB4IDMwcHggcmdiYSgwLDAsMCwwLjA4KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyPVwiMXB4IHNvbGlkICNFMkU4RjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHA9XCJzbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qPERyb3Bkb3duSXRlbSovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiAgICBpY29uPVwiVXNlclwiKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qICAgIGxhYmVsPVwi0J/RgNC+0YTQuNC70YxcIiovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiAgICBvbkNsaWNrPXsoKSA9PiB7Ki99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2FkbWluL3BhZ2VzL3Byb2ZpbGVcIjsqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogICAgfX0qL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyovPiovfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qPERyb3Bkb3duSXRlbSovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiAgICBpY29uPVwiTG9ja1wiKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qICAgIGxhYmVsPVwi0KHQvNC10L3QuNGC0Ywg0L/QsNGA0L7Qu9GMXCIqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogICAgb25DbGljaz17KCkgPT4geyovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9hZG1pbi9wYWdlcy9wcm9maWxlXCI7Ki99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qICAgIH19Ki99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qLz4qL31cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKjxEaXZpZGVyIC8+Ki99XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd25JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb249XCJMb2dPdXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cItCS0YvQudGC0LhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW5nZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9hZG1pbi9sb2dvdXRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgKTtcbn07XG5cblxuY29uc3QgRHJvcGRvd25JdGVtID0gKHsgaWNvbiwgbGFiZWwsIG9uQ2xpY2ssIGRhbmdlciB9OiBhbnkpID0+IChcbiAgICA8Qm94XG4gICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcbiAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXG4gICAgICAgIHB4PVwibWRcIlxuICAgICAgICBweT1cIm1kXCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiMTBweFwiLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogXCIwLjJzXCIsXG4gICAgICAgICAgICBjb2xvcjogZGFuZ2VyID8gXCIjREMyNjI2XCIgOiBcIiMxRTI5M0JcIixcbiAgICAgICAgICAgIGdhcDogXCIxMHB4XCIsXG4gICAgICAgIH19XG4gICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgIG9uTW91c2VFbnRlcj17KGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSBcIiNGMUY1RjlcIjtcbiAgICAgICAgfX1cbiAgICAgICAgb25Nb3VzZUxlYXZlPXsoZTogYW55KSA9PiB7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9IFwidHJhbnNwYXJlbnRcIjtcbiAgICAgICAgfX1cbiAgICA+XG4gICAgICAgIDxJY29uIGljb249e2ljb259IC8+XG4gICAgICAgIDxCb3ggZm9udFNpemU9XCJzbVwiPntsYWJlbH08L0JveD5cbiAgICA8L0JveD5cbik7XG5cbmNvbnN0IERpdmlkZXIgPSAoKSA9PiAoXG4gICAgPEJveFxuICAgICAgICBoZWlnaHQ9XCIxcHhcIlxuICAgICAgICBiZz1cIiNFMkU4RjBcIlxuICAgICAgICBteT1cInNtXCJcbiAgICAvPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgVG9wQmFyO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgSDIsIElucHV0IH0gZnJvbSBcIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtcblxuY29uc3QgZ3JhZGllbnRDb25maWcgPSB7XG4gICAgYW5nbGU6IDEzNSxcbiAgICBjb2xvcnM6IFtcbiAgICAgICAgeyBjb2xvcjogXCIjMUExQTFBXCIsIHN0b3A6IFwiMCVcIiB9LFxuICAgIF0sXG59O1xuXG5jb25zdCBnZXRHcmFkaWVudCA9ICgpID0+IHtcbiAgICBjb25zdCBzdG9wcyA9IGdyYWRpZW50Q29uZmlnLmNvbG9yc1xuICAgICAgICAubWFwKChjKSA9PiBgJHtjLmNvbG9yfSAke2Muc3RvcH1gKVxuICAgICAgICAuam9pbihcIiwgXCIpO1xuXG4gICAgcmV0dXJuIGBsaW5lYXItZ3JhZGllbnQoJHtncmFkaWVudENvbmZpZy5hbmdsZX1kZWcsICR7c3RvcHN9KWA7XG59O1xuXG5jb25zdCBMb2dpbiA9IChwcm9wczogYW55KSA9PiB7XG4gICAgY29uc3QgeyBhY3Rpb24sIGVycm9yTWVzc2FnZSB9ID0gcHJvcHM7XG5cbiAgICBjb25zdCBbZW1haWwsIHNldEVtYWlsXSA9IHVzZVN0YXRlKFwiXCIpO1xuICAgIGNvbnN0IFtwYXNzd29yZCwgc2V0UGFzc3dvcmRdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8Qm94IHN0eWxlPXt7XG4gICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgIG1pbkhlaWdodDogXCIxMDB2aFwiLFxuICAgICAgICAgICAgZmxleERpcmVjdGlvbjogXCJyb3dcIixcbiAgICAgICAgfX0+XG4gICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibG9naW4tbGVmdFwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgZmxleDogMSxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBnZXRHcmFkaWVudCgpLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJ3aGl0ZVwiLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPEJveCBzdHlsZT17eyB0ZXh0QWxpZ246IFwibGVmdFwiIH19PlxuICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCIvbG9nby5wbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwibG9nb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjQwMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAyMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgIDxwIHN0eWxlPXt7IGZvbnRTaXplOiAyNCwgb3BhY2l0eTogMC44IH19PlxuICAgICAgICAgICAgICAgICAgICAgICAg0J/QsNC90LXQu9GMINGD0L/RgNCw0LLQu9C10L3QuNGPXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIGZsZXg6IDEsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCIjRjhGQUZDXCIsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzYwLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMzIsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogMTYsXG4gICAgICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6IFwiMCAyMHB4IDQwcHggcmdiYSgwLDAsMCwwLjA2KVwiLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPEgyIHN0eWxlPXt7bWFyZ2luQm90dG9tOiAxNiwgZm9udFNpemU6IDI0fX0+XG4gICAgICAgICAgICAgICAgICAgICAgICDQktGF0L7QtCDQsiDRgdC40YHRgtC10LzRg1xuICAgICAgICAgICAgICAgICAgICA8L0gyPlxuXG4gICAgICAgICAgICAgICAgICAgIDxmb3JtIG1ldGhvZD1cInBvc3RcIiBhY3Rpb249e2FjdGlvbn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Qm94IHN0eWxlPXt7ZGlzcGxheTogXCJmbGV4XCIsIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsIGdhcDogMTZ9fT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cItCb0L7Qs9C40L1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZW1haWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZTogYW55KSA9PiBzZXRFbWFpbChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cItCf0LDRgNC+0LvRjFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwYXNzd29yZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlOiBhbnkpID0+IHNldFBhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9jaz17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgINCS0L7QudGC0LhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtlcnJvck1lc3NhZ2UgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb3ggbXQ9XCJtZFwiIGNvbG9yPVwicmVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgIDxzdHlsZT5cbiAgICAgICAgICAgICAgICB7YFxuICAgICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgICAgICAgICAgLmxvZ2luLWxlZnQge1xuICAgICAgICAgICAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBgfVxuICAgICAgICAgICAgPC9zdHlsZT5cbiAgICAgICAgPC9Cb3g+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExvZ2luO1xuIiwiaW1wb3J0IHsgQm94LCBMYWJlbCwgVGV4dCwgSWNvbiB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5jb25zdCBWaWRlb1VwbG9hZCA9ICh7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0pID0+IHtcbiAgICBjb25zdCBbcHJldmlldywgc2V0UHJldmlld10gPSB1c2VTdGF0ZShudWxsKTtcblxuICAgIGNvbnN0IGN1cnJlbnRWaWRlbyA9XG4gICAgICAgIHByZXZpZXcgfHxcbiAgICAgICAgKHJlY29yZD8ucGFyYW1zPy52aWRlb0ZpbGVcbiAgICAgICAgICAgID8gcmVjb3JkLnBhcmFtcy52aWRlb0ZpbGVcbiAgICAgICAgICAgIDogbnVsbCk7XG5cblxuICAgIGNvbnN0IGhhbmRsZUNoYW5nZSA9IChmaWxlKSA9PiB7XG4gICAgICAgIGlmICghZmlsZSkgcmV0dXJuO1xuXG4gICAgICAgIG9uQ2hhbmdlKHtcbiAgICAgICAgICAgIC4uLnJlY29yZCxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgIC4uLnJlY29yZC5wYXJhbXMsXG4gICAgICAgICAgICAgICAgW3Byb3BlcnR5Lm5hbWVdOiBbZmlsZV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xuICAgICAgICBzZXRQcmV2aWV3KHVybCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZURyb3AgPSAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGZpbGUgPSBlLmRhdGFUcmFuc2Zlci5maWxlcz8uWzBdO1xuICAgICAgICBoYW5kbGVDaGFuZ2UoZmlsZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVNlbGVjdCA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGZpbGUgPSBlLnRhcmdldC5maWxlcz8uWzBdO1xuICAgICAgICBoYW5kbGVDaGFuZ2UoZmlsZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHJlbW92ZUZpbGUgPSAoKSA9PiB7XG4gICAgICAgIHNldFByZXZpZXcobnVsbCk7XG5cbiAgICAgICAgb25DaGFuZ2Uoe1xuICAgICAgICAgICAgLi4ucmVjb3JkLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgLi4ucmVjb3JkLnBhcmFtcyxcbiAgICAgICAgICAgICAgICBbcHJvcGVydHkubmFtZV06IG51bGwsXG4gICAgICAgICAgICAgICAgdmlkZW9GaWxlOiBudWxsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGlucHV0SWQgPSBgdXBsb2FkLSR7cHJvcGVydHkucGF0aH1gO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPEJveCBtYXJnaW5Cb3R0b209XCJ4bFwiPlxuXG4gICAgICAgICAgICA8TGFiZWw+e1wi0JLQuNC00LXQviDRhNCw0LnQu1wifTwvTGFiZWw+XG5cbiAgICAgICAgICAgIHsvKiBEUk9QIFpPTkUgKi99XG5cbiAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbnB1dElkKT8uY2xpY2soKX1cbiAgICAgICAgICAgICAgICBvbkRyb3A9e2hhbmRsZURyb3B9XG4gICAgICAgICAgICAgICAgb25EcmFnT3Zlcj17KGUpID0+IGUucHJldmVudERlZmF1bHQoKX1cbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwiMnB4IGRhc2hlZCAjRTBFMEUwRkZcIixcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAxMixcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMjAsXG4gICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCIjZmFmYWZhXCIsXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8cCBzdHlsZT17e21hcmdpbkJvdHRvbTogOH19PlxuICAgICAgICAgICAgICAgICAgICDQn9C10YDQtdGC0LDRidC40YLQtSDQstC40LTQtdC+INGB0Y7QtNCwXG4gICAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgICAgPHAgc3R5bGU9e3tmb250U2l6ZTogMTIsIGNvbG9yOiBcIiM2NDc0OEJcIn19PlxuICAgICAgICAgICAgICAgICAgICDQuNC70LhcbiAgICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IDgsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjZweCAxMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBcIiNlN2U3ZTdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImJsYWNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDYsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAg0JLRi9Cx0YDQsNGC0Ywg0YTQsNC50LtcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2NlcHQ9XCJ2aWRlby9tcDQsdmlkZW8vd2VibSx2aWRlby9xdWlja3RpbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZVNlbGVjdH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7ZGlzcGxheTogXCJub25lXCJ9fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgICAgICA8cCBzdHlsZT17e21hcmdpblRvcDogMTAsIGZvbnRTaXplOiAxMiwgY29sb3I6IFwiIzk0QTNCOFwifX0+XG4gICAgICAgICAgICAgICAgICAgINCf0L7QtNC00LXRgNC20LjQstCw0LXRgtGB0Y86IG1wNCwgd2VibSwgbW92XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgICAgIHsvKiBQUkVWSUVXICovfVxuICAgICAgICAgICAge2N1cnJlbnRWaWRlbyAmJiAoXG4gICAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgICAgICBtdD1cIm1kXCJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiBcInNwYWNlLWJldHdlZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWQgI0U1RTdFQlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAxMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDEyLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCIjRkZGRkZGXCIsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7LyogTEVGVDogVklERU8gKi99XG4gICAgICAgICAgICAgICAgICAgIDxCb3ggc3R5bGU9e3sgZGlzcGxheTogXCJmbGV4XCIsIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsIGdhcDogMTIgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dmlkZW9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2N1cnJlbnRWaWRlb31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdEZpdDogXCJjb3ZlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGZvbnRTaXplPVwiMTNweFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZWNvcmQ/LnBhcmFtcz8udmlkZW9GaWxlIHx8IFwidmlkZW8ubXA0XCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBSSUdIVDogUkVNT1ZFICovfVxuICAgICAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtyZW1vdmVGaWxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAzMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNTAlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjRTVFN0VCXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gaWNvbj1cIlhcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvQm94PlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBWaWRlb1VwbG9hZDtcbiIsImltcG9ydCB7IEJveCwgTGFiZWwsIFRleHQsIEljb24gfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuY29uc3QgQkFTRV9VUkwgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgXCIvYXBpXCI7XG5cbmNvbnN0IGdldExhYmVsID0gKHByb3BlcnR5KSA9PiB7XG4gICAgY29uc3QgbWFwID0ge1xuICAgICAgICB1cGxvYWRJbWFnZTogXCLQmtCw0YDRgtC40L3QutCwXCIsXG4gICAgICAgIHVwbG9hZEljb246IFwi0JjQutC+0L3QutCwXCIsXG4gICAgfTtcblxuICAgIHJldHVybiBtYXBbcHJvcGVydHkubmFtZV0gfHwgcHJvcGVydHkubGFiZWw7XG59O1xuXG5jb25zdCBJbWFnZVVwbG9hZCA9ICh7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0pID0+IHtcbiAgICBjb25zdCBbcHJldmlldywgc2V0UHJldmlld10gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBcbiAgICBjb25zdCBrZXlNYXAgPSB7XG4gICAgICAgIHVwbG9hZEltYWdlOlxuICAgICAgICAgICAgT2JqZWN0LmtleXMocmVjb3JkPy5wYXJhbXMgfHwge30pXG4gICAgICAgICAgICAgICAgLmZpbmQoXG4gICAgICAgICAgICAgICAgICAgIGtleSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAga2V5LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJpbWFnZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYga2V5ICE9PSBcInVwbG9hZEltYWdlXCJcbiAgICAgICAgICAgICAgICApIHx8IFwiaW1hZ2VcIixcbiAgICAgICAgdXBsb2FkSWNvbjogXCJpY29uXCIsXG4gICAgfTtcblxuICAgIGNvbnN0IHJhd1VwbG9hZCA9IHJlY29yZD8ucGFyYW1zPy5bcHJvcGVydHkubmFtZV07XG4gICAgY29uc3QgcmF3U3RvcmVkID0gcmVjb3JkPy5wYXJhbXM/LltrZXlNYXBbcHJvcGVydHkubmFtZV1dO1xuXG4gICAgY29uc3QgdmFsdWUgPSBBcnJheS5pc0FycmF5KHJhd1VwbG9hZClcbiAgICAgICAgPyByYXdVcGxvYWRbMF1cbiAgICAgICAgOiByYXdTdG9yZWQ7XG5cbiAgICBjb25zdCBnZXRJbWFnZVNyYyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHByZXZpZXcpIHJldHVybiBwcmV2aWV3O1xuXG4gICAgICAgIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5zdGFydHNXaXRoKFwiaHR0cFwiKVxuICAgICAgICAgICAgICAgID8gdmFsdWVcbiAgICAgICAgICAgICAgICA6IGAke0JBU0VfVVJMfSR7dmFsdWV9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZpbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICBjb25zdCBjdXJyZW50SW1hZ2UgPSBnZXRJbWFnZVNyYygpO1xuXG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKGZpbGUpID0+IHtcbiAgICAgICAgaWYgKCFmaWxlKSByZXR1cm47XG5cbiAgICAgICAgb25DaGFuZ2Uoe1xuICAgICAgICAgICAgLi4ucmVjb3JkLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgLi4ucmVjb3JkLnBhcmFtcyxcbiAgICAgICAgICAgICAgICBbcHJvcGVydHkubmFtZV06IFtmaWxlXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XG4gICAgICAgIHNldFByZXZpZXcodXJsKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlRHJvcCA9IChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgZmlsZSA9IGUuZGF0YVRyYW5zZmVyLmZpbGVzPy5bMF07XG4gICAgICAgIGhhbmRsZUNoYW5nZShmaWxlKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlU2VsZWN0ID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgICAgIGhhbmRsZUNoYW5nZShmaWxlKTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVtb3ZlRmlsZSA9ICgpID0+IHtcbiAgICAgICAgc2V0UHJldmlldyhudWxsKTtcblxuICAgICAgICBjb25zdCBrZXkgPSBrZXlNYXBbcHJvcGVydHkubmFtZV07XG5cbiAgICAgICAgb25DaGFuZ2Uoe1xuICAgICAgICAgICAgLi4ucmVjb3JkLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgLi4ucmVjb3JkLnBhcmFtcyxcbiAgICAgICAgICAgICAgICBbcHJvcGVydHkubmFtZV06IG51bGwsXG4gICAgICAgICAgICAgICAgW2tleV06IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3QgaW5wdXRJZCA9IGB1cGxvYWQtJHtwcm9wZXJ0eS5wYXRofWA7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8Qm94IG1hcmdpbkJvdHRvbT1cInhsXCI+XG5cbiAgICAgICAgICAgIDxMYWJlbD57Z2V0TGFiZWwocHJvcGVydHkpfTwvTGFiZWw+XG5cbiAgICAgICAgICAgIHsvKiBEUk9QIFpPTkUgKi99XG5cbiAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbnB1dElkKT8uY2xpY2soKX1cbiAgICAgICAgICAgICAgICBvbkRyb3A9e2hhbmRsZURyb3B9XG4gICAgICAgICAgICAgICAgb25EcmFnT3Zlcj17KGUpID0+IGUucHJldmVudERlZmF1bHQoKX1cbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwiMnB4IGRhc2hlZCAjRTBFMEUwRkZcIixcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAxMixcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMjAsXG4gICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCIjZmFmYWZhXCIsXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8cCBzdHlsZT17e21hcmdpbkJvdHRvbTogOH19PlxuICAgICAgICAgICAgICAgICAgICDQn9C10YDQtdGC0LDRidC40YLQtSDQuNC30L7QsdGA0LDQttC10L3QuNC1INGB0Y7QtNCwXG4gICAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgICAgPHAgc3R5bGU9e3tmb250U2l6ZTogMTIsIGNvbG9yOiBcIiM2NDc0OEJcIn19PlxuICAgICAgICAgICAgICAgICAgICDQuNC70LhcbiAgICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IDgsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjZweCAxMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBcIiNlN2U3ZTdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImJsYWNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDYsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAg0JLRi9Cx0YDQsNGC0Ywg0YTQsNC50LtcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2NlcHQ9XCJpbWFnZS9wbmcsaW1hZ2UvanBlZyxpbWFnZS9zdmcreG1sLGltYWdlL3dlYnBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZVNlbGVjdH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7ZGlzcGxheTogXCJub25lXCJ9fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgICAgICA8cCBzdHlsZT17e21hcmdpblRvcDogMTAsIGZvbnRTaXplOiAxMiwgY29sb3I6IFwiIzk0QTNCOFwifX0+XG4gICAgICAgICAgICAgICAgICAgINCf0L7QtNC00LXRgNC20LjQstCw0LXRgtGB0Y86IFBORywgU1ZHLCBKUEcsIFdFQlBcbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgICAgey8qIFBSRVZJRVcgKi99XG4gICAgICAgICAgICB7Y3VycmVudEltYWdlICYmIChcbiAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICAgIG10PVwibWRcIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6IFwic3BhY2UtYmV0d2VlblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjRTVFN0VCXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDEyLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMTIsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBcIiNGRkZGRkZcIixcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsvKiBMRUZUOiBWSURFTyAqL31cbiAgICAgICAgICAgICAgICAgICAgPEJveCBzdHlsZT17e2Rpc3BsYXk6IFwiZmxleFwiLCBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLCBnYXA6IDEyfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtjdXJyZW50SW1hZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwicHJldmlld1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RGaXQ6IFwiY29udGFpblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwiI0YzRjRGNlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiA2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBmb250U2l6ZT1cIjEzcHhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdmFsdWUuc3BsaXQoJy8nKS5wb3AoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHZhbHVlPy5uYW1lIHx8IFwiaW1hZ2UucG5nXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBSSUdIVDogUkVNT1ZFICovfVxuICAgICAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtyZW1vdmVGaWxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAzMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNTAlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjRTVFN0VCXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gaWNvbj1cIlhcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvQm94PlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbWFnZVVwbG9hZDtcbiIsImltcG9ydCB7IEJveCwgSWNvbiB9IGZyb20gXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArIFwiL2FwaVwiO1xuXG5jb25zdCBnZXRZb3VUdWJlSWQgPSAodXJsKSA9PiB7XG4gICAgaWYgKHVybC5pbmNsdWRlcyhcInNob3J0cy9cIikpIHtcbiAgICAgICAgcmV0dXJuIHVybC5zcGxpdChcInNob3J0cy9cIilbMV0uc3BsaXQoXCI/XCIpWzBdO1xuICAgIH1cbiAgICBpZiAodXJsLmluY2x1ZGVzKFwid2F0Y2g/dj1cIikpIHtcbiAgICAgICAgcmV0dXJuIHVybC5zcGxpdChcIndhdGNoP3Y9XCIpWzFdLnNwbGl0KFwiJlwiKVswXTtcbiAgICB9XG4gICAgaWYgKHVybC5pbmNsdWRlcyhcInlvdXR1LmJlL1wiKSkge1xuICAgICAgICByZXR1cm4gdXJsLnNwbGl0KFwieW91dHUuYmUvXCIpWzFdLnNwbGl0KFwiP1wiKVswXTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCBpc1lvdVR1YmUgPSAodXJsKSA9PlxuICAgIHVybC5pbmNsdWRlcyhcInlvdXR1YmUuY29tXCIpIHx8IHVybC5pbmNsdWRlcyhcInlvdXR1LmJlXCIpO1xuXG5jb25zdCBGaWxlUHJldmlldyA9ICh7IHJlY29yZCwgcHJvcGVydHksIHdoZXJlIH0pID0+IHtcbiAgICBjb25zdCByYXcgPSByZWNvcmQ/LnBhcmFtcz8uW3Byb3BlcnR5Lm5hbWVdO1xuXG4gICAgaWYgKCFyYXcpIHtcbiAgICAgICAgcmV0dXJuIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiBcIiM5Q0EzQUZcIiB9fT7igJQ8L3NwYW4+O1xuICAgIH1cblxuICAgIGNvbnN0IHNyYyA9IHJhdy5zdGFydHNXaXRoKFwiaHR0cFwiKVxuICAgICAgICA/IHJhd1xuICAgICAgICA6IGAke0JBU0VfVVJMfSR7cmF3fWA7XG5cbiAgICBjb25zdCBpc0ltYWdlID0gL1xcLihqcGd8anBlZ3xwbmd8d2VicHxzdmcpJC9pLnRlc3Qoc3JjKTtcbiAgICBjb25zdCBpc1ZpZGVvID0gL1xcLihtcDR8d2VibXxtb3YpJC9pLnRlc3Qoc3JjKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxCb3hcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICBwYWRkaW5nQm90dG9tOiB3aGVyZSA9PT0gXCJzaG93XCIgPyAyNCA6IDAsXG4gICAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgICB7LyogSU1BR0UgKi99XG4gICAgICAgICAgICB7aXNJbWFnZSAmJiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICBzcmM9e3NyY31cbiAgICAgICAgICAgICAgICAgICAgYWx0PVwiZmlsZVwiXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDMyLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0Rml0OiBcImNvdmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNTAlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBcIiNGM0Y0RjZcIixcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgey8qIFZJREVPIEZJTEUgKi99XG4gICAgICAgICAgICB7aXNWaWRlbyAmJiAoXG4gICAgICAgICAgICAgICAgPHZpZGVvXG4gICAgICAgICAgICAgICAgICAgIHNyYz17c3JjfVxuICAgICAgICAgICAgICAgICAgICBtdXRlZFxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMyLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAzMixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdEZpdDogXCJjb3ZlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjUwJVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCIjMDAwXCIsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIHsvKiBZT1VUVUJFICovfVxuICAgICAgICAgICAgeyFpc0ltYWdlICYmICFpc1ZpZGVvICYmIGlzWW91VHViZShzcmMpICYmICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaWQgPSBnZXRZb3VUdWJlSWQoc3JjKTtcbiAgICAgICAgICAgICAgICBpZiAoIWlkKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRodW1iID0gYGh0dHBzOi8vaW1nLnlvdXR1YmUuY29tL3ZpLyR7aWR9L2hxZGVmYXVsdC5qcGdgO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17c3JjfSB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMzIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17dGh1bWJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cInlvdXR1YmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdEZpdDogXCJjb3ZlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjUwJVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Lyog4pa2IG92ZXJsYXkgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc2V0OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilrZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pKCl9XG5cbiAgICAgICAgICAgIHsvKiBPVEhFUiBMSU5LUyAqL31cbiAgICAgICAgICAgIHshaXNJbWFnZSAmJiAhaXNWaWRlbyAmJiAhaXNZb3VUdWJlKHNyYykgJiYgKFxuICAgICAgICAgICAgICAgIDxhIGhyZWY9e3NyY30gdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMzIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjUwJVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwiI0YxRjVGOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBpY29uPVwiR2xvYmVcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICApfVxuICAgICAgICA8L0JveD5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRmlsZVByZXZpZXc7XG4iLCJpbXBvcnQgeyBEcm9wWm9uZSwgRHJvcFpvbmVJdGVtLCBGb3JtR3JvdXAsIExhYmVsIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBmbGF0LCB1c2VUcmFuc2xhdGlvbiB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5jb25zdCBFZGl0ID0gKHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSkgPT4ge1xuICAgIGNvbnN0IHsgdHJhbnNsYXRlUHJvcGVydHkgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XG4gICAgY29uc3QgeyBwYXJhbXMgfSA9IHJlY29yZDtcbiAgICBjb25zdCB7IGN1c3RvbSB9ID0gcHJvcGVydHk7XG4gICAgY29uc3QgcGF0aCA9IGZsYXQuZ2V0KHBhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHkpO1xuICAgIGNvbnN0IGtleSA9IGZsYXQuZ2V0KHBhcmFtcywgY3VzdG9tLmtleVByb3BlcnR5KTtcbiAgICBjb25zdCBmaWxlID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20uZmlsZVByb3BlcnR5KTtcbiAgICBjb25zdCBbb3JpZ2luYWxLZXksIHNldE9yaWdpbmFsS2V5XSA9IHVzZVN0YXRlKGtleSk7XG4gICAgY29uc3QgW2ZpbGVzVG9VcGxvYWQsIHNldEZpbGVzVG9VcGxvYWRdID0gdXNlU3RhdGUoW10pO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIC8vIGl0IG1lYW5zIG1lYW5zIHRoYXQgc29tZW9uZSBoaXQgc2F2ZSBhbmQgbmV3IGZpbGUgaGFzIGJlZW4gdXBsb2FkZWRcbiAgICAgICAgLy8gaW4gdGhpcyBjYXNlIGZsaWVzVG9VcGxvYWQgc2hvdWxkIGJlIGNsZWFyZWQuXG4gICAgICAgIC8vIFRoaXMgaGFwcGVucyB3aGVuIHVzZXIgdHVybnMgb2ZmIHJlZGlyZWN0IGFmdGVyIG5ldy9lZGl0XG4gICAgICAgIGlmICgodHlwZW9mIGtleSA9PT0gJ3N0cmluZycgJiYga2V5ICE9PSBvcmlnaW5hbEtleSlcbiAgICAgICAgICAgIHx8ICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyAmJiAhb3JpZ2luYWxLZXkpXG4gICAgICAgICAgICB8fCAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgJiYgQXJyYXkuaXNBcnJheShrZXkpICYmIGtleS5sZW5ndGggIT09IG9yaWdpbmFsS2V5Lmxlbmd0aCkpIHtcbiAgICAgICAgICAgIHNldE9yaWdpbmFsS2V5KGtleSk7XG4gICAgICAgICAgICBzZXRGaWxlc1RvVXBsb2FkKFtdKTtcbiAgICAgICAgfVxuICAgIH0sIFtrZXksIG9yaWdpbmFsS2V5XSk7XG4gICAgY29uc3Qgb25VcGxvYWQgPSAoZmlsZXMpID0+IHtcbiAgICAgICAgc2V0RmlsZXNUb1VwbG9hZChmaWxlcyk7XG4gICAgICAgIG9uQ2hhbmdlKGN1c3RvbS5maWxlUHJvcGVydHksIGZpbGVzKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgb25DaGFuZ2UoY3VzdG9tLmZpbGVQcm9wZXJ0eSwgbnVsbCk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVNdWx0aVJlbW92ZSA9IChzaW5nbGVLZXkpID0+IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSAoZmxhdC5nZXQocmVjb3JkLnBhcmFtcywgY3VzdG9tLmtleVByb3BlcnR5KSB8fCBbXSkuaW5kZXhPZihzaW5nbGVLZXkpO1xuICAgICAgICBjb25zdCBmaWxlc1RvRGVsZXRlID0gZmxhdC5nZXQocmVjb3JkLnBhcmFtcywgY3VzdG9tLmZpbGVzVG9EZWxldGVQcm9wZXJ0eSkgfHwgW107XG4gICAgICAgIGlmIChwYXRoICYmIHBhdGgubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgbmV3UGF0aCA9IHBhdGgubWFwKChjdXJyZW50UGF0aCwgaSkgPT4gKGkgIT09IGluZGV4ID8gY3VycmVudFBhdGggOiBudWxsKSk7XG4gICAgICAgICAgICBsZXQgbmV3UGFyYW1zID0gZmxhdC5zZXQocmVjb3JkLnBhcmFtcywgY3VzdG9tLmZpbGVzVG9EZWxldGVQcm9wZXJ0eSwgWy4uLmZpbGVzVG9EZWxldGUsIGluZGV4XSk7XG4gICAgICAgICAgICBuZXdQYXJhbXMgPSBmbGF0LnNldChuZXdQYXJhbXMsIGN1c3RvbS5maWxlUGF0aFByb3BlcnR5LCBuZXdQYXRoKTtcbiAgICAgICAgICAgIG9uQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICAuLi5yZWNvcmQsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBuZXdQYXJhbXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnWW91IGNhbm5vdCByZW1vdmUgZmlsZSB3aGVuIHRoZXJlIGFyZSBubyB1cGxvYWRlZCBmaWxlcyB5ZXQnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm1Hcm91cCwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgbnVsbCwgdHJhbnNsYXRlUHJvcGVydHkocHJvcGVydHkubGFiZWwsIHByb3BlcnR5LnJlc291cmNlSWQpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEcm9wWm9uZSwgeyBvbkNoYW5nZTogb25VcGxvYWQsIG11bHRpcGxlOiBjdXN0b20ubXVsdGlwbGUsIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgbWltZVR5cGVzOiBjdXN0b20ubWltZVR5cGVzLFxuICAgICAgICAgICAgICAgIG1heFNpemU6IGN1c3RvbS5tYXhTaXplLFxuICAgICAgICAgICAgfSwgZmlsZXM6IGZpbGVzVG9VcGxvYWQgfSksXG4gICAgICAgICFjdXN0b20ubXVsdGlwbGUgJiYga2V5ICYmIHBhdGggJiYgIWZpbGVzVG9VcGxvYWQubGVuZ3RoICYmIGZpbGUgIT09IG51bGwgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRHJvcFpvbmVJdGVtLCB7IGZpbGVuYW1lOiBrZXksIHNyYzogcGF0aCwgb25SZW1vdmU6IGhhbmRsZVJlbW92ZSB9KSksXG4gICAgICAgIGN1c3RvbS5tdWx0aXBsZSAmJiBrZXkgJiYga2V5Lmxlbmd0aCAmJiBwYXRoID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsIGtleS5tYXAoKHNpbmdsZUtleSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIC8vIHdoZW4gd2UgcmVtb3ZlIGl0ZW1zIHdlIHNldCBvbmx5IHBhdGggaW5kZXggdG8gbnVsbHMuXG4gICAgICAgICAgICAvLyBrZXkgaXMgc3RpbGwgdGhlcmUuIFRoaXMgaXMgYmVjYXVzZVxuICAgICAgICAgICAgLy8gd2UgaGF2ZSB0byBtYWludGFpbiBhbGwgdGhlIGluZGV4ZXMuIFNvIGhlcmUgd2Ugc2ltcGx5IGZpbHRlciBvdXQgZWxlbWVudHMgd2hpY2hcbiAgICAgICAgICAgIC8vIHdlcmUgcmVtb3ZlZCBhbmQgZGlzcGxheSBvbmx5IHdoYXQgd2FzIGxlZnRcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQYXRoID0gcGF0aFtpbmRleF07XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFBhdGggPyAoUmVhY3QuY3JlYXRlRWxlbWVudChEcm9wWm9uZUl0ZW0sIHsga2V5OiBzaW5nbGVLZXksIGZpbGVuYW1lOiBzaW5nbGVLZXksIHNyYzogcGF0aFtpbmRleF0sIG9uUmVtb3ZlOiAoKSA9PiBoYW5kbGVNdWx0aVJlbW92ZShzaW5nbGVLZXkpIH0pKSA6ICcnO1xuICAgICAgICB9KSkpIDogJycpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBFZGl0O1xuIiwiZXhwb3J0IGNvbnN0IEF1ZGlvTWltZVR5cGVzID0gW1xuICAgICdhdWRpby9hYWMnLFxuICAgICdhdWRpby9taWRpJyxcbiAgICAnYXVkaW8veC1taWRpJyxcbiAgICAnYXVkaW8vbXBlZycsXG4gICAgJ2F1ZGlvL29nZycsXG4gICAgJ2FwcGxpY2F0aW9uL29nZycsXG4gICAgJ2F1ZGlvL29wdXMnLFxuICAgICdhdWRpby93YXYnLFxuICAgICdhdWRpby93ZWJtJyxcbiAgICAnYXVkaW8vM2dwcDInLFxuXTtcbmV4cG9ydCBjb25zdCBWaWRlb01pbWVUeXBlcyA9IFtcbiAgICAndmlkZW8veC1tc3ZpZGVvJyxcbiAgICAndmlkZW8vbXBlZycsXG4gICAgJ3ZpZGVvL29nZycsXG4gICAgJ3ZpZGVvL21wMnQnLFxuICAgICd2aWRlby93ZWJtJyxcbiAgICAndmlkZW8vM2dwcCcsXG4gICAgJ3ZpZGVvLzNncHAyJyxcbl07XG5leHBvcnQgY29uc3QgSW1hZ2VNaW1lVHlwZXMgPSBbXG4gICAgJ2ltYWdlL2JtcCcsXG4gICAgJ2ltYWdlL2dpZicsXG4gICAgJ2ltYWdlL2pwZWcnLFxuICAgICdpbWFnZS9wbmcnLFxuICAgICdpbWFnZS9zdmcreG1sJyxcbiAgICAnaW1hZ2Uvdm5kLm1pY3Jvc29mdC5pY29uJyxcbiAgICAnaW1hZ2UvdGlmZicsXG4gICAgJ2ltYWdlL3dlYnAnLFxuXTtcbmV4cG9ydCBjb25zdCBDb21wcmVzc2VkTWltZVR5cGVzID0gW1xuICAgICdhcHBsaWNhdGlvbi94LWJ6aXAnLFxuICAgICdhcHBsaWNhdGlvbi94LWJ6aXAyJyxcbiAgICAnYXBwbGljYXRpb24vZ3ppcCcsXG4gICAgJ2FwcGxpY2F0aW9uL2phdmEtYXJjaGl2ZScsXG4gICAgJ2FwcGxpY2F0aW9uL3gtdGFyJyxcbiAgICAnYXBwbGljYXRpb24vemlwJyxcbiAgICAnYXBwbGljYXRpb24veC03ei1jb21wcmVzc2VkJyxcbl07XG5leHBvcnQgY29uc3QgRG9jdW1lbnRNaW1lVHlwZXMgPSBbXG4gICAgJ2FwcGxpY2F0aW9uL3gtYWJpd29yZCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtZnJlZWFyYycsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5hbWF6b24uZWJvb2snLFxuICAgICdhcHBsaWNhdGlvbi9tc3dvcmQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQud29yZHByb2Nlc3NpbmdtbC5kb2N1bWVudCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1mb250b2JqZWN0JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5wcmVzZW50YXRpb24nLFxuICAgICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnNwcmVhZHNoZWV0JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC50ZXh0JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQucHJlc2VudGF0aW9ubWwucHJlc2VudGF0aW9uJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLnJhcicsXG4gICAgJ2FwcGxpY2F0aW9uL3J0ZicsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5zcHJlYWRzaGVldG1sLnNoZWV0Jyxcbl07XG5leHBvcnQgY29uc3QgVGV4dE1pbWVUeXBlcyA9IFtcbiAgICAndGV4dC9jc3MnLFxuICAgICd0ZXh0L2NzdicsXG4gICAgJ3RleHQvaHRtbCcsXG4gICAgJ3RleHQvY2FsZW5kYXInLFxuICAgICd0ZXh0L2phdmFzY3JpcHQnLFxuICAgICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAnYXBwbGljYXRpb24vbGQranNvbicsXG4gICAgJ3RleHQvamF2YXNjcmlwdCcsXG4gICAgJ3RleHQvcGxhaW4nLFxuICAgICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnLFxuICAgICdhcHBsaWNhdGlvbi94bWwnLFxuICAgICd0ZXh0L3htbCcsXG5dO1xuZXhwb3J0IGNvbnN0IEJpbmFyeURvY3NNaW1lVHlwZXMgPSBbXG4gICAgJ2FwcGxpY2F0aW9uL2VwdWIremlwJyxcbiAgICAnYXBwbGljYXRpb24vcGRmJyxcbl07XG5leHBvcnQgY29uc3QgRm9udE1pbWVUeXBlcyA9IFtcbiAgICAnZm9udC9vdGYnLFxuICAgICdmb250L3R0ZicsXG4gICAgJ2ZvbnQvd29mZicsXG4gICAgJ2ZvbnQvd29mZjInLFxuXTtcbmV4cG9ydCBjb25zdCBPdGhlck1pbWVUeXBlcyA9IFtcbiAgICAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyxcbiAgICAnYXBwbGljYXRpb24veC1jc2gnLFxuICAgICdhcHBsaWNhdGlvbi92bmQuYXBwbGUuaW5zdGFsbGVyK3htbCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtaHR0cGQtcGhwJyxcbiAgICAnYXBwbGljYXRpb24veC1zaCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyxcbiAgICAndm5kLnZpc2lvJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1vemlsbGEueHVsK3htbCcsXG5dO1xuZXhwb3J0IGNvbnN0IE1pbWVUeXBlcyA9IFtcbiAgICAuLi5BdWRpb01pbWVUeXBlcyxcbiAgICAuLi5WaWRlb01pbWVUeXBlcyxcbiAgICAuLi5JbWFnZU1pbWVUeXBlcyxcbiAgICAuLi5Db21wcmVzc2VkTWltZVR5cGVzLFxuICAgIC4uLkRvY3VtZW50TWltZVR5cGVzLFxuICAgIC4uLlRleHRNaW1lVHlwZXMsXG4gICAgLi4uQmluYXJ5RG9jc01pbWVUeXBlcyxcbiAgICAuLi5PdGhlck1pbWVUeXBlcyxcbiAgICAuLi5Gb250TWltZVR5cGVzLFxuICAgIC4uLk90aGVyTWltZVR5cGVzLFxuXTtcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXNcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBJY29uIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBmbGF0IH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQXVkaW9NaW1lVHlwZXMsIEltYWdlTWltZVR5cGVzIH0gZnJvbSAnLi4vdHlwZXMvbWltZS10eXBlcy50eXBlLmpzJztcbmNvbnN0IFNpbmdsZUZpbGUgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IG5hbWUsIHBhdGgsIG1pbWVUeXBlLCB3aWR0aCB9ID0gcHJvcHM7XG4gICAgaWYgKHBhdGggJiYgcGF0aC5sZW5ndGgpIHtcbiAgICAgICAgaWYgKG1pbWVUeXBlICYmIEltYWdlTWltZVR5cGVzLmluY2x1ZGVzKG1pbWVUeXBlKSkge1xuICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHsgc3JjOiBwYXRoLCBzdHlsZTogeyBtYXhIZWlnaHQ6IHdpZHRoLCBtYXhXaWR0aDogd2lkdGggfSwgYWx0OiBuYW1lIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWltZVR5cGUgJiYgQXVkaW9NaW1lVHlwZXMuaW5jbHVkZXMobWltZVR5cGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhdWRpb1wiLCB7IGNvbnRyb2xzOiB0cnVlLCBzcmM6IHBhdGggfSxcbiAgICAgICAgICAgICAgICBcIllvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZVwiLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIG51bGwsIFwiYXVkaW9cIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRyYWNrXCIsIHsga2luZDogXCJjYXB0aW9uc1wiIH0pKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgYXM6IFwiYVwiLCBocmVmOiBwYXRoLCBtbDogXCJkZWZhdWx0XCIsIHNpemU6IFwic21cIiwgcm91bmRlZDogdHJ1ZSwgdGFyZ2V0OiBcIl9ibGFua1wiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEljb24sIHsgaWNvbjogXCJEb2N1bWVudERvd25sb2FkXCIsIGNvbG9yOiBcIndoaXRlXCIsIG1yOiBcImRlZmF1bHRcIiB9KSxcbiAgICAgICAgICAgIG5hbWUpKSk7XG59O1xuY29uc3QgRmlsZSA9ICh7IHdpZHRoLCByZWNvcmQsIHByb3BlcnR5IH0pID0+IHtcbiAgICBjb25zdCB7IGN1c3RvbSB9ID0gcHJvcGVydHk7XG4gICAgbGV0IHBhdGggPSBmbGF0LmdldChyZWNvcmQ/LnBhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHkpO1xuICAgIGlmICghcGF0aCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgbmFtZSA9IGZsYXQuZ2V0KHJlY29yZD8ucGFyYW1zLCBjdXN0b20uZmlsZU5hbWVQcm9wZXJ0eSA/IGN1c3RvbS5maWxlTmFtZVByb3BlcnR5IDogY3VzdG9tLmtleVByb3BlcnR5KTtcbiAgICBjb25zdCBtaW1lVHlwZSA9IGN1c3RvbS5taW1lVHlwZVByb3BlcnR5XG4gICAgICAgICYmIGZsYXQuZ2V0KHJlY29yZD8ucGFyYW1zLCBjdXN0b20ubWltZVR5cGVQcm9wZXJ0eSk7XG4gICAgaWYgKCFwcm9wZXJ0eS5jdXN0b20ubXVsdGlwbGUpIHtcbiAgICAgICAgaWYgKGN1c3RvbS5vcHRzICYmIGN1c3RvbS5vcHRzLmJhc2VVcmwpIHtcbiAgICAgICAgICAgIHBhdGggPSBgJHtjdXN0b20ub3B0cy5iYXNlVXJsfS8ke25hbWV9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2luZ2xlRmlsZSwgeyBwYXRoOiBwYXRoLCBuYW1lOiBuYW1lLCB3aWR0aDogd2lkdGgsIG1pbWVUeXBlOiBtaW1lVHlwZSB9KSk7XG4gICAgfVxuICAgIGlmIChjdXN0b20ub3B0cyAmJiBjdXN0b20ub3B0cy5iYXNlVXJsKSB7XG4gICAgICAgIGNvbnN0IGJhc2VVcmwgPSBjdXN0b20ub3B0cy5iYXNlVXJsIHx8ICcnO1xuICAgICAgICBwYXRoID0gcGF0aC5tYXAoKHNpbmdsZVBhdGgsIGluZGV4KSA9PiBgJHtiYXNlVXJsfS8ke25hbWVbaW5kZXhdfWApO1xuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsIHBhdGgubWFwKChzaW5nbGVQYXRoLCBpbmRleCkgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2luZ2xlRmlsZSwgeyBrZXk6IHNpbmdsZVBhdGgsIHBhdGg6IHNpbmdsZVBhdGgsIG5hbWU6IG5hbWVbaW5kZXhdLCB3aWR0aDogd2lkdGgsIG1pbWVUeXBlOiBtaW1lVHlwZVtpbmRleF0gfSkpKSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEZpbGU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlLmpzJztcbmNvbnN0IExpc3QgPSAocHJvcHMpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KEZpbGUsIHsgd2lkdGg6IDEwMCwgLi4ucHJvcHMgfSkpO1xuZXhwb3J0IGRlZmF1bHQgTGlzdDtcbiIsImltcG9ydCB7IEZvcm1Hcm91cCwgTGFiZWwgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlLmpzJztcbmNvbnN0IFNob3cgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IHByb3BlcnR5IH0gPSBwcm9wcztcbiAgICBjb25zdCB7IHRyYW5zbGF0ZVByb3BlcnR5IH0gPSB1c2VUcmFuc2xhdGlvbigpO1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIG51bGwsXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGFiZWwsIG51bGwsIHRyYW5zbGF0ZVByb3BlcnR5KHByb3BlcnR5LmxhYmVsLCBwcm9wZXJ0eS5yZXNvdXJjZUlkKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmlsZSwgeyB3aWR0aDogXCIxMDAlXCIsIC4uLnByb3BzIH0pKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgU2hvdztcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuLi9zcmMvYWRtaW4vZGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EYXNoYm9hcmQgPSBEYXNoYm9hcmRcbmltcG9ydCBUb3BCYXIgZnJvbSAnLi4vc3JjL2FkbWluL3RvcGJhcidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVG9wQmFyID0gVG9wQmFyXG5pbXBvcnQgTG9naW4gZnJvbSAnLi4vc3JjL2FkbWluL2xvZ2luJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Mb2dpbiA9IExvZ2luXG5pbXBvcnQgVmlkZW9VcGxvYWQgZnJvbSAnLi4vc3JjL2FkbWluL3ZpZGVvLXVwbG9hZCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVmlkZW9VcGxvYWQgPSBWaWRlb1VwbG9hZFxuaW1wb3J0IEltYWdlVXBsb2FkIGZyb20gJy4uL3NyYy9hZG1pbi9pbWFnZS11cGxvYWQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltYWdlVXBsb2FkID0gSW1hZ2VVcGxvYWRcbmltcG9ydCBGaWxlUHJldmlldyBmcm9tICcuLi9zcmMvYWRtaW4vZmlsZS1wcmV2aWV3J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5GaWxlUHJldmlldyA9IEZpbGVQcmV2aWV3XG5pbXBvcnQgVXBsb2FkRWRpdENvbXBvbmVudCBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvVXBsb2FkRWRpdENvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVXBsb2FkRWRpdENvbXBvbmVudCA9IFVwbG9hZEVkaXRDb21wb25lbnRcbmltcG9ydCBVcGxvYWRMaXN0Q29tcG9uZW50IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRMaXN0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5VcGxvYWRMaXN0Q29tcG9uZW50ID0gVXBsb2FkTGlzdENvbXBvbmVudFxuaW1wb3J0IFVwbG9hZFNob3dDb21wb25lbnQgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZFNob3dDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlVwbG9hZFNob3dDb21wb25lbnQgPSBVcGxvYWRTaG93Q29tcG9uZW50Il0sIm5hbWVzIjpbImFwaSIsIkFwaUNsaWVudCIsIkRhc2hib2FyZCIsImRhdGEiLCJzZXREYXRhIiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJnZXREYXNoYm9hcmQiLCJ0aGVuIiwicmVzIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJwYWRkaW5nIiwid3JhcHBlciIsInRpdGxlIiwiZ3JpZCIsIkNhcmQiLCJ2YWx1ZSIsImNhdGVnb3JpZXNDb3VudCIsImljb24iLCJTZXJ2aWNlSWNvbiIsImNvbG9yIiwicmVzb3VyY2UiLCJpdGVtc0NvdW50IiwiV29ya0ljb24iLCJsZWFkc0NvdW50IiwiTGVhZEljb24iLCJuYXZpZ2F0ZSIsInVzZU5hdmlnYXRlIiwib25DbGljayIsImNhcmQiLCJib3JkZXJMZWZ0IiwiY3Vyc29yIiwidG9wIiwiaWNvbldyYXBwZXIiLCJiYWNrZ3JvdW5kIiwidmFsdWVTdHlsZSIsImxhYmVsIiwid2lkdGgiLCJoZWlnaHQiLCJ2aWV3Qm94IiwiZmlsbCIsIngiLCJ5IiwicngiLCJzdHJva2UiLCJzdHJva2VXaWR0aCIsImQiLCJzdHJva2VMaW5lY2FwIiwibWluSGVpZ2h0IiwibWFyZ2luQm90dG9tIiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwiZGlzcGxheSIsImdyaWRUZW1wbGF0ZUNvbHVtbnMiLCJnYXAiLCJmbGV4IiwiYm9yZGVyUmFkaXVzIiwiYm94U2hhZG93IiwiZmxleERpcmVjdGlvbiIsInRyYW5zaXRpb24iLCJqdXN0aWZ5Q29udGVudCIsImFsaWduSXRlbXMiLCJUb3BCYXIiLCJwcm9wcyIsIm9wZW4iLCJzZXRPcGVuIiwicmVmIiwidXNlUmVmIiwiYWRtaW4iLCJ1c2VDdXJyZW50QWRtaW4iLCJ0b2dnbGVTaWRlYmFyIiwiaGFuZGxlQ2xpY2siLCJlIiwiY3VycmVudCIsImNvbnRhaW5zIiwidGFyZ2V0IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIkJveCIsImJnIiwicHgiLCJweSIsImJvcmRlckJvdHRvbSIsInBvc2l0aW9uIiwiekluZGV4IiwibXIiLCJJY29uIiwiQXZhdGFyIiwidXNlcm5hbWUiLCJ0b1VwcGVyQ2FzZSIsInJpZ2h0IiwiYm9yZGVyIiwicCIsIkRyb3Bkb3duSXRlbSIsImRhbmdlciIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsIm9uTW91c2VFbnRlciIsImN1cnJlbnRUYXJnZXQiLCJvbk1vdXNlTGVhdmUiLCJncmFkaWVudENvbmZpZyIsImFuZ2xlIiwiY29sb3JzIiwic3RvcCIsImdldEdyYWRpZW50Iiwic3RvcHMiLCJtYXAiLCJjIiwiam9pbiIsIkxvZ2luIiwiYWN0aW9uIiwiZXJyb3JNZXNzYWdlIiwiZW1haWwiLCJzZXRFbWFpbCIsInBhc3N3b3JkIiwic2V0UGFzc3dvcmQiLCJjbGFzc05hbWUiLCJ0ZXh0QWxpZ24iLCJzcmMiLCJhbHQiLCJvcGFjaXR5IiwiSDIiLCJtZXRob2QiLCJJbnB1dCIsIm5hbWUiLCJwbGFjZWhvbGRlciIsIm9uQ2hhbmdlIiwidHlwZSIsIkJ1dHRvbiIsInZhcmlhbnQiLCJibG9jayIsIm10IiwiVmlkZW9VcGxvYWQiLCJwcm9wZXJ0eSIsInJlY29yZCIsInByZXZpZXciLCJzZXRQcmV2aWV3IiwiY3VycmVudFZpZGVvIiwicGFyYW1zIiwidmlkZW9GaWxlIiwiaGFuZGxlQ2hhbmdlIiwiZmlsZSIsInVybCIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsImhhbmRsZURyb3AiLCJwcmV2ZW50RGVmYXVsdCIsImRhdGFUcmFuc2ZlciIsImZpbGVzIiwiaGFuZGxlU2VsZWN0IiwicmVtb3ZlRmlsZSIsImlucHV0SWQiLCJwYXRoIiwiTGFiZWwiLCJnZXRFbGVtZW50QnlJZCIsImNsaWNrIiwib25Ecm9wIiwib25EcmFnT3ZlciIsIm1hcmdpblRvcCIsImFjY2VwdCIsIm9iamVjdEZpdCIsIlRleHQiLCJCQVNFX1VSTCIsIm9yaWdpbiIsImdldExhYmVsIiwidXBsb2FkSW1hZ2UiLCJ1cGxvYWRJY29uIiwiSW1hZ2VVcGxvYWQiLCJrZXlNYXAiLCJPYmplY3QiLCJrZXlzIiwiZmluZCIsImtleSIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJyYXdVcGxvYWQiLCJyYXdTdG9yZWQiLCJBcnJheSIsImlzQXJyYXkiLCJnZXRJbWFnZVNyYyIsInN0YXJ0c1dpdGgiLCJGaWxlIiwiY3VycmVudEltYWdlIiwic3BsaXQiLCJwb3AiLCJnZXRZb3VUdWJlSWQiLCJpc1lvdVR1YmUiLCJGaWxlUHJldmlldyIsIndoZXJlIiwicmF3IiwiaXNJbWFnZSIsInRlc3QiLCJpc1ZpZGVvIiwicGFkZGluZ0JvdHRvbSIsIm11dGVkIiwiaWQiLCJ0aHVtYiIsImluc2V0IiwidXNlVHJhbnNsYXRpb24iLCJmbGF0IiwiRm9ybUdyb3VwIiwiRHJvcFpvbmUiLCJEcm9wWm9uZUl0ZW0iLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiLCJVcGxvYWRFZGl0Q29tcG9uZW50IiwiVXBsb2FkTGlzdENvbXBvbmVudCIsIlVwbG9hZFNob3dDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7SUFJQSxNQUFNQSxHQUFHLEdBQUcsSUFBSUMsaUJBQVMsRUFBRTtJQUUzQixNQUFNQyxTQUFTLEdBQUdBLE1BQU07TUFDcEIsTUFBTSxDQUFDQyxJQUFJLEVBQUVDLE9BQU8sQ0FBQyxHQUFHQyxjQUFRLENBQU0sSUFBSSxDQUFDO0lBRTNDQyxFQUFBQSxlQUFTLENBQUMsTUFBTTtRQUNaTixHQUFHLENBQUNPLFlBQVksRUFBRSxDQUFDQyxJQUFJLENBQUVDLEdBQUcsSUFBSztJQUM3QkwsTUFBQUEsT0FBTyxDQUFDSyxHQUFHLENBQUNOLElBQUksQ0FBQztJQUNyQixJQUFBLENBQUMsQ0FBQztNQUNOLENBQUMsRUFBRSxFQUFFLENBQUM7SUFFTixFQUFBLElBQUksQ0FBQ0EsSUFBSSxFQUFFLG9CQUFPTyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0lBQUtDLElBQUFBLEtBQUssRUFBRTtJQUFFQyxNQUFBQSxPQUFPLEVBQUU7SUFBRztJQUFFLEdBQUEsRUFBQyxxREFBZ0IsQ0FBQztNQUVoRSxvQkFDSUgsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtJQUFLQyxJQUFBQSxLQUFLLEVBQUVFO09BQVEsZUFDaEJKLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxJQUFBLEVBQUE7SUFBSUMsSUFBQUEsS0FBSyxFQUFFRztJQUFNLEdBQUEsRUFBQyw0Q0FBVyxDQUFDLGVBRTlCTCxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0lBQUtDLElBQUFBLEtBQUssRUFBRUk7SUFBSyxHQUFBLGVBQ2JOLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ00sSUFBSSxFQUFBO0lBQ0RGLElBQUFBLEtBQUssRUFBQyx3REFBVztRQUNqQkcsS0FBSyxFQUFFZixJQUFJLENBQUNnQixlQUFnQjtJQUM1QkMsSUFBQUEsSUFBSSxlQUFF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

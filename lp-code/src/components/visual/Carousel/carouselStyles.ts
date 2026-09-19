import { type CSSProperties } from "react";

export const carouselStyles: Record<string, CSSProperties> = {
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        outline: "none",
    },
    track: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        width: "100%",
        perspective: "1000px",
    },
    // O Container que dita o tamanho para qualquer mídia
    itemWrapper: {
        position: "relative",
        overflow: "hidden", 
        borderRadius: "16px",
        backgroundColor: "#1a1a1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    // Estilo base para Tag IMG e VIDEO dentro do Wrapper
    responsiveMedia: {
        width: "100%",
        height: "100%",
        objectFit: "cover", 
        objectPosition: "center",
        display: "block",
        borderRadius: "16px",
    },
    // Estilo exclusivo para blocos de texto
    textContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        color: "#ffffff",
        textAlign: "center",
        boxSizing: "border-box",
        fontSize: "1.2rem",
    },
    // Dimensões fixas para manter simetria
    mainItem: {
        width: "45%",
        maxWidth: "600px",
        aspectRatio: "16 / 9", 
        boxShadow: "0 12px 40px rgba(110, 5, 170, 0.3)",
        zIndex: 2,
    },
    sideItem: {
        width: "20%",
        maxWidth: "280px",
        aspectRatio: "16 / 10", 
        zIndex: 1,
    },
    controls: {
        display: "flex",
        gap: "16px",
    },
    button: {
        padding: "12px 32px",
        cursor: "pointer",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "rgb(110, 5, 170)",
        color: "white",
        fontWeight: "bold",
        transition: "transform 0.2s ease",
    }
};
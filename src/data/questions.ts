export interface Question {
    id: string;
    text: string;
    section: number;
    options: { text: string; value: number }[];
}

export interface Section {
    id: number;
    title: string;
    summary: string;
}

export interface ProfileQuestion {
    id: string;
    text: string;
    options: string[];
}

export const SECTIONS: Section[] = [
    {
        id: 1,
        title: "Branding",
        summary: "Acá vas a reflexionar sobre tu identidad de marca. El branding no es solo el logo o un diseño: es la forma en que tu empresa transmite confianza, valores y se diferencia en un mercado lleno de opciones. Preguntamos sobre esto porque una marca sólida es el punto de partida para fidelizar clientes y sostener el crecimiento."
    },
    {
        id: 2,
        title: "Posición de Mercado",
        summary: "Este bloque busca entender cómo se ubica tu empresa frente a la competencia y las tendencias actuales. La posición de mercado define si tu propuesta de valor es única y si estás aprovechando las oportunidades que existen. Preguntamos sobre esto porque conocer tu lugar en el mercado es clave para tomar decisiones estratégicas y crecer con seguridad."
    },
    {
        id: 3,
        title: "Eficiencia Operativa",
        summary: "Acá vas a evaluar cómo funciona tu negocio por dentro. La eficiencia operativa no se trata solo de reducir costos, sino de tener procesos claros, productivos y listos para escalar. Preguntamos sobre esto porque una operación ágil y organizada es lo que permite que las ideas se conviertan en resultados sostenibles."
    },
    {
        id: 4,
        title: "Plan de Comunicación",
        summary: "Este grupo de preguntas apunta a cómo tu empresa se comunica, tanto hacia adentro como hacia afuera. La comunicación define cómo te perciben tus clientes y cómo tus mensajes apoyan los objetivos del negocio. Preguntamos sobre esto porque una comunicación clara y coherente es lo que transforma la estrategia en confianza y crecimiento real."
    }
];

export const MAIN_QUESTIONS: Question[] = [
    // SECTION 1: Branding
    {
        id: "q1",
        section: 1,
        text: "¿Tu marca logra que los clientes vuelvan una y otra vez?",
        options: [
            { text: "Sí, genera vínculos duraderos", value: 100 },
            { text: "A veces, depende de la campaña", value: 50 },
            { text: "No, las compras son esporádicas", value: 0 }
        ]
    },
    {
        id: "q2",
        section: 1,
        text: "¿Qué tan clara es la propuesta de valor de tu marca?",
        options: [
            { text: "Muy clara y diferenciada", value: 100 },
            { text: "Algo clara, pero confusa en partes", value: 50 },
            { text: "Poco clara, difícil de entender", value: 0 }
        ]
    },
    {
        id: "q3",
        section: 1,
        text: "¿Tu identidad de marca te ayuda a destacar frente a la competencia?",
        options: [
            { text: "Sí, me diferencia claramente", value: 100 },
            { text: "A veces, pero no siempre", value: 50 },
            { text: "No, parezco similar a otros", value: 0 }
        ]
    },
    {
        id: "q4",
        section: 1,
        text: "¿Qué tanto invertís en autenticidad y originalidad?",
        options: [
            { text: "Es mi prioridad", value: 100 },
            { text: "Lo intento, pero uso recursos genéricos", value: 50 },
            { text: "No lo considero importante", value: 0 }
        ]
    },
    {
        id: "q5",
        section: 1,
        text: "¿Tu marca transmite valores y storytelling?",
        options: [
            { text: "Sí, está integrada en todo", value: 100 },
            { text: "Parcialmente, en algunas acciones", value: 50 },
            { text: "No, casi nunca", value: 0 }
        ]
    },
    {
        id: "q6",
        section: 1,
        text: "¿Qué tan personalizada es la experiencia que ofrecés a tus clientes?",
        options: [
            { text: "Muy personalizada", value: 100 },
            { text: "Algo personalizada", value: 50 },
            { text: "Nada personalizada", value: 0 }
        ]
    },
    {
        id: "q7",
        section: 1,
        text: "¿Tu comunicación en redes sociales refleja estrategia de branding?",
        options: [
            { text: "Sí, está alineada y coherente", value: 100 },
            { text: "A veces, pero se siente promocional", value: 50 },
            { text: "No, es solo publicidad aislada", value: 0 }
        ]
    },
    {
        id: "q8",
        section: 1,
        text: "¿Tu identidad de marca se mantiene coherente al integrar nuevas tecnologías?",
        options: [
            { text: "Sí, se adapta sin perder esencia", value: 100 },
            { text: "A veces, con algunos desajustes", value: 50 },
            { text: "No, se pierde consistencia", value: 0 }
        ]
    },
    {
        id: "q9",
        section: 1,
        text: "¿Qué tan fuerte es tu presencia de marca en el mercado?",
        options: [
            { text: "Muy fuerte y reconocida", value: 100 },
            { text: "Moderada, con espacio para crecer", value: 50 },
            { text: "Débil, poco visible", value: 0 }
        ]
    },
    {
        id: "q10",
        section: 1,
        text: "¿Tu branding transmite confianza y credibilidad?",
        options: [
            { text: "Sí, totalmente", value: 100 },
            { text: "Parcialmente", value: 50 },
            { text: "No, genera dudas", value: 0 }
        ]
    },
    {
        id: "q11",
        section: 1,
        text: "¿Qué tan sostenible y transparente es tu narrativa de marca?",
        options: [
            { text: "Muy sostenible y transparente", value: 100 },
            { text: "Algo sostenible, debe mejorar", value: 50 },
            { text: "Poco sostenible o nada transparente", value: 0 }
        ]
    },
    {
        id: "q12",
        section: 1,
        text: "¿Tu identidad de marca está diseñada estratégicamente para crecer?",
        options: [
            { text: "Sí, está pensada para el futuro", value: 100 },
            { text: "Parcialmente, con ajustes necesarios", value: 50 },
            { text: "No, es improvisada", value: 0 }
        ]
    },

    // SECTION 2: Posición de Mercado
    {
        id: "q13",
        section: 2,
        text: "¿Tu propuesta de valor es única en el mercado?",
        options: [
            { text: "Sí, claramente diferenciada", value: 100 },
            { text: "Algo diferenciada", value: 50 },
            { text: "No, es similar a otras", value: 0 }
        ]
    },
    {
        id: "q14",
        section: 2,
        text: "¿Qué tan bien conocés las tendencias de tu mercado?",
        options: [
            { text: "Muy bien, estoy actualizado", value: 100 },
            { text: "Algo, pero me falta información", value: 50 },
            { text: "Poco o nada, no me guio por tendencias", value: 0 }
        ]
    },
    {
        id: "q15",
        section: 2,
        text: "¿Tu empresa aprovecha oportunidades del mercado?",
        options: [
            { text: "Sí, de manera constante", value: 100 },
            { text: "A veces, según los recursos disponibles", value: 50 },
            { text: "No, casi nunca", value: 0 }
        ]
    },
    {
        id: "q16",
        section: 2,
        text: "¿Qué tan alineada está tu estrategia con las demandas actuales?",
        options: [
            { text: "Muy alineada", value: 100 },
            { text: "Parcialmente", value: 50 },
            { text: "Poco alineada", value: 0 }
        ]
    },
    {
        id: "q17",
        section: 2,
        text: "¿Tu diferenciación se basa en sostenibilidad o innovación?",
        options: [
            { text: "Sí, la innovación es un pilar central", value: 100 },
            { text: "Nos centramos en la sostenibilidad", value: 50 },
            { text: "No, no las aplico", value: 0 }
        ]
    },
    {
        id: "q18",
        section: 2,
        text: "¿Qué tan claro es tu análisis de la competencia?",
        options: [
            { text: "Muy claro y actualizado", value: 100 },
            { text: "Algo claro, casi no la analizo", value: 50 },
            { text: "Poco claro o inexistente", value: 0 }
        ]
    },
    {
        id: "q19",
        section: 2,
        text: "¿Tu empresa segmenta bien a sus clientes?",
        options: [
            { text: "Sí, con datos demográficos, psicográficos y de comportamiento", value: 100 },
            { text: "Parcialmente, con datos básicos", value: 50 },
            { text: "No, mi segmento es unico", value: 0 }
        ]
    },
    {
        id: "q20",
        section: 2,
        text: "¿Qué tan fuerte es tu ventaja competitiva?",
        options: [
            { text: "Muy fuerte", value: 100 },
            { text: "Moderada", value: 50 },
            { text: "Débil", value: 0 }
        ]
    },
    {
        id: "q21",
        section: 2,
        text: "¿Tu benchmarking se centra en métricas digitales y predictivas?",
        options: [
            { text: "Sí, totalmente", value: 100 },
            { text: "Parcialmente", value: 50 },
            { text: "No, solo comparo precios", value: 0 }
        ]
    },
    {
        id: "q22",
        section: 2,
        text: "¿Qué tan adaptativa es tu propuesta de valor?",
        options: [
            { text: "Muy adaptativa", value: 100 },
            { text: "Algo adaptativa", value: 50 },
            { text: "Poco adaptativa", value: 0 }
        ]
    },
    {
        id: "q23",
        section: 2,
        text: "¿Tu posicionamiento en el mercado es claro para los clientes?",
        options: [
            { text: "Sí, muy claro", value: 100 },
            { text: "Algo claro", value: 50 },
            { text: "No, confuso", value: 0 }
        ]
    },
    {
        id: "q24",
        section: 2,
        text: "¿Tu estrategia de mercado es continua o puntual?",
        options: [
            { text: "Continua y dinámica", value: 100 },
            { text: "Mixta, según hay recursos", value: 50 },
            { text: "Puntual y estática", value: 0 }
        ]
    },

    // SECTION 3: Eficiencia Operativa
    {
        id: "q25",
        section: 3,
        text: "¿Tus procesos internos están diagnosticados y optimizados?",
        options: [
            { text: "Sí, de manera constante", value: 100 },
            { text: "Parcialmente", value: 50 },
            { text: "No, nunca", value: 0 }
        ]
    },
    {
        id: "q26",
        section: 3,
        text: "¿Qué tan productiva es tu operación diaria?",
        options: [
            { text: "Muy productiva", value: 100 },
            { text: "Moderada", value: 50 },
            { text: "Poco productiva", value: 0 }
        ]
    },
    {
        id: "q27",
        section: 3,
        text: "¿Tus KPIs reflejan el éxito empresarial?",
        options: [
            { text: "Sí, están bien definidos", value: 100 },
            { text: "Parcialmente", value: 50 },
            { text: "No, no existen", value: 0 }
        ]
    },
    {
        id: "q28",
        section: 3,
        text: "¿Qué tan ágil es tu operación frente a la competencia?",
        options: [
            { text: "Muy ágil", value: 100 },
            { text: "Mdeianamente ágil", value: 50 },
            { text: "Poco ágil", value: 0 }
        ]
    },
    {
        id: "q29",
        section: 3,
        text: "¿Tus flujos de trabajo reducen ineficiencias?",
        options: [
            { text: "Sí, de manera clara", value: 100 },
            { text: "Parcialmente", value: 50 },
            { text: "No, generan problemas", value: 0 }
        ]
    },
    {
        id: "q30",
        section: 3,
        text: "¿Qué tan bien identificás áreas de mejora?",
        options: [
            { text: "Muy bien", value: 100 },
            { text: "Algo bien", value: 50 },
            { text: "Poco o nada", value: 0 }
        ]
    },
    {
        id: "q31",
        section: 3,
        text: "¿Tus indicadores de desempeño se monitorean regularmente?",
        options: [
            { text: "Sí, siempre", value: 100 },
            { text: "A veces", value: 50 },
            { text: "No, nunca", value: 0 }
        ]
    },
    {
        id: "q32",
        section: 3,
        text: "¿Tu operación garantiza competitividad?",
        options: [
            { text: "Sí, totalmente", value: 100 },
            { text: "Parcialmente", value: 50 },
            { text: "No, nada", value: 0 }
        ]
    },
    {
        id: "q33",
        section: 3,
        text: "¿Qué tan efectiva es tu estrategia operativa?",
        options: [
            { text: "Muy efectiva", value: 100 },
            { text: "Algo efectiva", value: 50 },
            { text: "Poco efectiva", value: 0 }
        ]
    },
    {
        id: "q34",
        section: 3,
        text: "¿Tus procesos internos están alineados con objetivos estratégicos?",
        options: [
            { text: "Sí, totalmente", value: 100 },
            { text: "Parcialmente", value: 50 },
            { text: "No, nada", value: 0 }
        ]
    },
    {
        id: "q35",
        section: 3,
        text: "¿Qué tan rápido corregís errores operativos?",
        options: [
            { text: "Muy rápido", value: 100 },
            { text: "Moderado", value: 50 },
            { text: "Lento", value: 0 }
        ]
    },
    {
        id: "q36",
        section: 3,
        text: "¿Tu operación está preparada para crecer?",
        options: [
            { text: "Sí, lista para escalar", value: 100 },
            { text: "Parcialmente", value: 50 },
            { text: "No, no está preparada", value: 0 }
        ]
    },

    // SECTION 4: Plan de Comunicación
    {
        id: "q37",
        section: 4,
        text: "¿Tus canales de comunicación ayudan a cumplir objetivos?",
        options: [
            { text: "Sí, son eficientes", value: 100 },
            { text: "Parcialmente", value: 50 },
            { text: "No tengo medida de ello", value: 0 }
        ]
    },
    {
        id: "q38",
        section: 4,
        text: "¿Tu comunicación externa impacta positivamente en clientes?",
        options: [
            { text: "Sí, claramente", value: 100 },
            { text: "A veces", value: 50 },
            { text: "No, siento que no ", value: 0 }
        ]
    },
    {
        id: "q39",
        section: 4,
        text: "¿Tus mensajes están alineados con expectativas del mercado?",
        options: [
            { text: "Sí, totalmente", value: 100 },
            { text: "Algunos si, otros no", value: 50 },
            { text: "No, nada", value: 0 }
        ]
    },
    {
        id: "q40",
        section: 4,
        text: "¿Qué tan fuerte es tu estrategia de marketing actual?",
        options: [
            { text: "Muy fuerte", value: 100 },
            { text: "Moderada", value: 50 },
            { text: "Débil", value: 0 }
        ]
    },
    {
        id: "q41",
        section: 4,
        text: "¿Tus campañas publicitarias generan confianza?",
        options: [
            { text: "Sí, mucha", value: 100 },
            { text: "Algo", value: 50 },
            { text: "No, nada", value: 0 }
        ]
    },
    {
        id: "q42",
        section: 4,
        text: "¿Qué tan bien recogés feedback de clientes?",
        options: [
            { text: "Muy bien", value: 100 },
            { text: "Algo bien", value: 50 },
            { text: "Poco o nada", value: 0 }
        ]
    },
    {
        id: "q43",
        section: 4,
        text: "¿Tus redes sociales reflejan coherencia estratégica?",
        options: [
            { text: "Sí, totalmente", value: 100 },
            { text: "Parcialmente", value: 50 },
            { text: "No, nada", value: 0 }
        ]
    },
    {
        id: "q44",
        section: 4,
        text: "¿Qué tan clara es tu comunicación interna?",
        options: [
            { text: "Muy clara", value: 100 },
            { text: "Algo clara", value: 50 },
            { text: "Poco clara", value: 0 }
        ]
    },
    {
        id: "q45",
        section: 4,
        text: "¿Tus mensajes fortalecen la percepción de marca?",
        options: [
            { text: "Sí, mucho", value: 100 },
            { text: "Algo", value: 50 },
            { text: "No, nada", value: 0 }
        ]
    },
    {
        id: "q46",
        section: 4,
        text: "¿Qué tan alineada está tu comunicación con los objetivos del negocio?",
        options: [
            { text: "Muy alineada", value: 100 },
            { text: "Parcialmente", value: 50 },
            { text: "No, nada", value: 0 }
        ]
    },
    {
        id: "q47",
        section: 4,
        text: "¿Tus canales de comunicación se adaptan a nuevas tendencias?",
        options: [
            { text: "Sí, rápidamente", value: 100 },
            { text: "Parcialmente", value: 50 },
            { text: "No, muy poco", value: 0 }
        ]
    },
    {
        id: "q48",
        section: 4,
        text: "¿Tu comunicación logra generar confianza en el mercado?",
        options: [
            { text: "Sí, totalmente", value: 100 },
            { text: "Parcialmente", value: 50 },
            { text: "No, nada", value: 0 }
        ]
    }
];

export const INTRO_TEXT = "Este cuestionario está pensado para ayudarte a mirar tu empresa desde cuatro ángulos clave: la marca, el mercado, la operación y la comunicación. No hace falta que tengas conocimientos técnicos; las preguntas están diseñadas para que reflexiones sobre tu negocio y descubras en qué área conviene empezar a mejorar para crecer.";

export const CLOSING_TEXT = "Gracias por completar este cuestionario. Ahora tenés una visión más clara de las áreas clave de tu empresa que necesitan atención y mejora. Usá esta información para planificar acciones concretas y fortalecer tu negocio. Recordá que el crecimiento sostenible se construye paso a paso, con estrategia y compromiso. ¡Mucho éxito en tu camino empresarial!";

export const PROFILE_SUBTITLE = "Este cuestionario inicial te ayudará a definir el perfil básico de tu empresa para ajustar mejor el diagnóstico y las recomendaciones.";

export const PROFILE_QUESTIONS: ProfileQuestion[] = [
    {
        id: "characteristics",
        text: "1. ¿Qué características tiene tu empresa?",
        options: ["Empresa de productos", "Empresa de servicios", "Empresa mixta (productos y servicios)"]
    },
    {
        id: "employees",
        text: "2. ¿Cuántos operarios o empleados tiene tu empresa?",
        options: ["Solo vos y ayudante (ocasional o fijo)", "1-5 (microempresa)", "6-15 (pequeña empresa)"]
    },
    {
        id: "structure",
        text: "3. ¿Cómo está estructurada tu empresa?",
        options: ["Propietario único o familia", "Estructura jerárquica básica", "Estructura jerárquica compleja", "Socios"]
    },
    {
        id: "trajectory",
        text: "4. ¿Cuántos años de trayectoria tiene tu empresa?",
        options: ["1-3 años", "4-10 años", "Más de 10 años"]
    },
    {
        id: "market",
        text: "5. ¿Cuál es el principal mercado al que te dirigís?",
        options: ["Local", "Regional", "Nacional"]
    }
];

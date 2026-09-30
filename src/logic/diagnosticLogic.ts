export type MarketPosition = "Vulnerable" | "En riesgo" | "En crecimiento" | "Preparada para expansión";

export interface Scenario {
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
    expected_impact: "low" | "medium" | "high";
}

export interface DiagnosticOutput {
    market_position: MarketPosition;
    diagnosis_tags: string[];
    scenarios: Scenario[];
    top_actions: string[];
    evidence: string[];
    scores: {
        marca: number;
        mercado: number;
        operacion: number;
        comunicacion: number;
    }
}

export interface Answers {
    [key: string]: number; // 0-100
}

const WEIGHTS = {
    branding: 0.40,
    marketPosition: 0.30,
    efficiency: 0.20,
    communication: 0.10,
};

export function calculateGlobalScore(answers: Answers): number {
    const getSectionScore = (start: number, end: number) => {
        let sum = 0;
        let count = 0;
        for (let i = start; i <= end; i++) {
            const key = `q${i}`;
            if (answers[key] !== undefined) {
                sum += answers[key];
                count++;
            }
        }
        return count > 0 ? sum / count : 0;
    };

    const scores = {
        branding: getSectionScore(1, 12),
        marketPosition: getSectionScore(13, 24),
        efficiency: getSectionScore(25, 36),
        communication: getSectionScore(37, 48),
    };

    return (
        scores.branding * WEIGHTS.branding +
        scores.marketPosition * WEIGHTS.marketPosition +
        scores.efficiency * WEIGHTS.efficiency +
        scores.communication * WEIGHTS.communication
    );
}

export function getMarketPosition(score: number): MarketPosition {
    if (score <= 35) return "Vulnerable";
    if (score <= 60) return "En riesgo";
    if (score <= 80) return "En crecimiento";
    return "Preparada para expansión";
}

export function generateDiagnostic(answers: Answers): DiagnosticOutput {
    const score = calculateGlobalScore(answers);
    const position = getMarketPosition(score);

    const getSectionAvg = (start: number, end: number) => {
        let sum = 0, count = 0;
        for (let i = start; i <= end; i++) {
            const val = answers[`q${i}`];
            if (val !== undefined) { sum += val; count++; }
        }
        return count > 0 ? sum / count : 100;
    };

    const sectionAverages = [
        { name: "Branding", score: getSectionAvg(1, 12), msg: "Debilidad en identidad de marca y diferenciación estratégica." },
        { name: "Mercado", score: getSectionAvg(13, 24), msg: "Falta de claridad en la ventaja competitiva y segmentación." },
        { name: "Operaciones", score: getSectionAvg(25, 36), msg: "Ineficiencias en procesos internos y falta de automatización." },
        { name: "Comunicación", score: getSectionAvg(37, 48), msg: "Fallas en canales externos o falta de coherencia en el mensaje." }
    ];

    const evidence = sectionAverages
        .filter(s => s.score < 70)
        .sort((a, b) => a.score - b.score)
        .map(s => `[${s.name}] ${s.msg}`)
        .slice(0, 3);

    if (evidence.length === 0) {
        evidence.push("Consistencia sólida en todas las áreas evaluadas.");
    }

    const diagnosis_tags = score < 50
        ? ["Intervención Urgente", "Riesgo Operativo", "Marca Blanca"]
        : score < 75
            ? ["Crecimiento Pendiente", "Optimización", "Potencial"]
            : ["Líder de Mercado", "Escalabilidad", "Visión 2026"];

    const scenarios: Scenario[] = [
        {
            title: "Plan de Resiliencia",
            description: score < 50 ? "Enfoque en supervivencia y saneamiento de caja." : "Enfoque en blindaje ante volatilidad externa.",
            priority: score < 50 ? "high" : "medium",
            expected_impact: "high"
        },
        {
            title: "Transformación Digital",
            description: "Migración de procesos manuales a sistemas con IA y automatización.",
            priority: "high",
            expected_impact: "high"
        }
    ];

    const top_actions = score < 60
        ? ["Auditoría completa de costos.", "Redefinición de propuesta de valor.", "Mapeo urgente de flujos críticos."]
        : ["Implementación de IA Agéntica.", "Expansión a nuevos segmentos demográficos.", "Optimización de CLV mediante personalización."];

    return {
        market_position: position,
        diagnosis_tags,
        scenarios,
        top_actions,
        evidence,
        scores: {
            marca: sectionAverages[0].score,
            mercado: sectionAverages[1].score,
            operacion: sectionAverages[2].score,
            comunicacion: sectionAverages[3].score
        }
    };
}

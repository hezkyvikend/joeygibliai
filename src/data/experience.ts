export type ExperienceItem = {
  company: string
  role: string
  location?: string
  start: string
  end: string
  summary: string
  bullets: string[]
}

export const experience: ExperienceItem[] = [
  {
    company: "IBM",
    role: "Solution Architect — Generative AI",
    location: "New York",
    start: "2025",
    end: "Present",
    summary:
      "Architecting enterprise-grade generative AI systems across fraud, supply chain, and IT operations, with a focus on measurable impact and governed deployment.",
    bullets: [
      "Designed a fraud-extraction pipeline reducing investigation workload by ~20% and influencing ~$1M in additional AI infrastructure spend.",
      "Built an on-demand Celery inference system stabilizing a 14M+ record summarization workload, cutting cost ~50% and runtime ~30%.",
      "Led multi-million-dollar architecture workshops and delivered an agentic AI bootcamp with a Langfuse-based evaluation and governance layer."
    ]
  },
  {
    company: "IBM",
    role: "AI Engineer",
    location: "New York",
    start: "2023",
    end: "2025",
    summary:
      "Delivered high-impact pilots and product feedback across watsonx, retrieval systems, and LLM-powered analytics for federal and enterprise clients.",
    bullets: [
      "Led the first watsonx BI customer preview tied to a ~$3.7M opportunity, creating a repeatable design-thinking framework adopted across teams.",
      "Co-designed a RAG system for a federal agency with a custom retrieval evaluation approach that surpassed an 80% accuracy requirement.",
      "Built LangChain-based analytics prototypes and delivered enterprise-wide technical enablements on watsonx.ai and governance."
    ]
  },
  {
    company: "IBM Research",
    role: "Data Science Lead",
    location: "New York",
    start: "2021",
    end: "2023",
    summary:
      "Translated early IBM Research prototypes in 5G and network analytics into scalable client pilots focused on distributed ML and endpoint discovery.",
    bullets: [
      "Led four enterprise deployments for an IBM Research 5G analytics platform, bridging research code with production-adjacent pilots.",
      "Built PySpark feature pipelines improving device discovery by 40% and developed embedding-based models for behavioral endpoint clustering.",
      "Co-architected a scalable analytics platform (S3, MongoDB, Kubeflow), optimizing metadata indexing and distributed ML orchestration."
    ]
  },
  {
    company: "IBM",
    role: "Data Science Engineer",
    location: "New York",
    start: "2018",
    end: "2021",
    summary:
      "Delivered applied ML solutions across healthcare, public sector, and enterprise analytics, strengthening foundations in modeling and distributed data pipelines.",
    bullets: [
      "Built a neighborhood-decline prediction model (+13% lift) featured in a published IBM white paper.",
      "Developed Spark-based ML pipelines for patient-risk prediction, enabling proactive interventions and scalable batch scoring.",
      "Supported 6+ cross-industry engagements, influencing ~$2M in sales through rapid prototyping and technical delivery."
    ]
  }
];
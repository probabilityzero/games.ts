import type { Quiz } from './types'

const quiz: Quiz = {
  id: "sci-002",
  slug: "anatomy-physiology-basics",
  title: "Anatomy & Physiology Basics",
  description: "Fundamental anatomy and physiology concepts covering major systems, organs, and functions.",
  category: "Science",
  difficulty: "medium",
  estimatedTime: 12,
  bannerImage: "/images/biology-cells-dna-microscope.jpg",
  accentColor: "from-green-500 to-emerald-600",
  icon: "🧬",
  tags: ["biology", "anatomy", "physiology"],
  questions: [
    { id: "q1", text: "Which organ is primarily responsible for filtering blood and producing urine?", options: ["Liver", "Kidney", "Spleen", "Pancreas"], correctAnswer: 1, explanation: "Kidneys filter blood to remove waste and produce urine." },
    { id: "q2", text: "What type of joint is the shoulder (glenohumeral) joint?", options: ["Hinge", "Ball-and-socket", "Pivot", "Saddle"], correctAnswer: 1, explanation: "The shoulder is a ball-and-socket joint allowing a wide range of motion." },
    { id: "q3", text: "Which blood cells transport oxygen around the body?", options: ["White blood cells", "Platelets", "Red blood cells", "Plasma cells"], correctAnswer: 2, explanation: "Red blood cells contain hemoglobin which carries oxygen." },
    { id: "q4", text: "Which structure separates the thoracic cavity from the abdominal cavity?", options: ["Diaphragm", "Pericardium", "Pleura", "Mediastinum"], correctAnswer: 0, explanation: "The diaphragm is the primary muscle dividing thorax and abdomen." },
    { id: "q5", text: "Which part of the neuron receives incoming signals?", options: ["Axon", "Dendrite", "Nucleus", "Myelin sheath"], correctAnswer: 1, explanation: "Dendrites receive synaptic input from other neurons." },
    { id: "q6", text: "Which organ produces bile to help digest fats?", options: ["Gallbladder", "Liver", "Stomach", "Pancreas"], correctAnswer: 1, explanation: "The liver produces bile; the gallbladder stores it." },
    { id: "q7", text: "What is the main function of platelets?", options: ["Carry oxygen", "Fight infection", "Blood clotting", "Transport hormones"], correctAnswer: 2, explanation: "Platelets are essential for blood clotting and preventing bleeding." },
    { id: "q8", text: "Which muscle is the primary extensor of the forearm at the elbow?", options: ["Biceps brachii", "Triceps brachii", "Brachialis", "Brachioradialis"], correctAnswer: 1, explanation: "Triceps brachii extends the forearm; biceps flexes it." },
    { id: "q9", text: "Which chamber of the heart pumps oxygenated blood to the systemic circulation?", options: ["Right atrium", "Right ventricle", "Left atrium", "Left ventricle"], correctAnswer: 3, explanation: "The left ventricle pumps oxygenated blood into the aorta for systemic circulation." },
    { id: "q10", text: "Where in the nephron does most glucose reabsorption occur?", options: ["Bowman's capsule", "Proximal convoluted tubule", "Loop of Henle", "Collecting duct"], correctAnswer: 1, explanation: "The proximal convoluted tubule reabsorbs most filtered glucose and solutes." },
    { id: "q11", text: "Which hormone raises blood glucose by stimulating glycogen breakdown?", options: ["Insulin", "Glucagon", "Aldosterone", "Thyroxine"], correctAnswer: 1, explanation: "Glucagon stimulates glycogenolysis to increase blood glucose." },
    { id: "q12", text: "What is the functional unit of the lung where gas exchange occurs?", options: ["Bronchiole", "Alveolus", "Pleura", "Trachea"], correctAnswer: 1, explanation: "Alveoli are the tiny sacs where oxygen and CO2 are exchanged with blood." },
    { id: "q13", text: "Which type of muscle tissue is voluntary and striated?", options: ["Cardiac muscle", "Smooth muscle", "Skeletal muscle", "Connective muscle"], correctAnswer: 2, explanation: "Skeletal muscle is striated and under voluntary control." },
    { id: "q14", text: "Which organ is primarily responsible for detoxification of drugs and metabolism?", options: ["Kidney", "Liver", "Lung", "Spleen"], correctAnswer: 1, explanation: "The liver metabolizes drugs and detoxifies compounds." },
    { id: "q15", text: "Which structure in the small intestine increases surface area for absorption?", options: ["Rugae", "Villi", "Cilia", "Crypts"], correctAnswer: 1, explanation: "Villi (and microvilli) increase absorptive surface area in the small intestine." },
    { id: "q16", text: "Which cranial nerve controls facial expression muscles?", options: ["Trigeminal (V)", "Facial (VII)", "Vagus (X)", "Accessory (XI)"], correctAnswer: 1, explanation: "The facial nerve (VII) innervates muscles of facial expression." },
    { id: "q17", text: "What component of blood carries dissolved nutrients, hormones, and proteins?", options: ["Red blood cells", "Plasma", "Platelets", "White blood cells"], correctAnswer: 1, explanation: "Plasma is the liquid component carrying nutrients, hormones, and proteins." },
    { id: "q18", text: "Which bone forms the forehead?", options: ["Parietal bone", "Occipital bone", "Frontal bone", "Temporal bone"], correctAnswer: 2, explanation: "The frontal bone forms the forehead and frontal part of the skull." },
    { id: "q19", text: "Where are red blood cells produced in adults?", options: ["Spleen", "Liver", "Bone marrow", "Thymus"], correctAnswer: 2, explanation: "Red blood cells are produced in the red bone marrow of adult bones." },
    { id: "q20", text: "Which organ system includes the hypothalamus and pituitary gland?", options: ["Nervous system", "Endocrine system", "Immune system", "Respiratory system"], correctAnswer: 1, explanation: "The hypothalamus and pituitary are central to the endocrine system." },
    { id: "q21", text: "Which substance increases the surface tension in the alveoli and prevents collapse?", options: ["Surfactant", "Mucus", "Plasma", "Collagen"], correctAnswer: 0, explanation: "Pulmonary surfactant reduces surface tension, keeping alveoli open." },
    { id: "q22", text: "Which part of the digestive system is primarily responsible for water absorption and feces formation?", options: ["Stomach", "Small intestine", "Large intestine (colon)", "Esophagus"], correctAnswer: 2, explanation: "The large intestine absorbs water and compacts feces." },
    { id: "q23", text: "Which gland sits atop the kidneys and produces adrenaline (epinephrine)?", options: ["Thyroid", "Adrenal (suprarenal)", "Pituitary", "Pancreas"], correctAnswer: 1, explanation: "The adrenal glands produce adrenaline and other corticosteroids." },
    { id: "q24", text: "Which valve prevents backflow of blood from the left ventricle into the left atrium?", options: ["Tricuspid valve", "Pulmonary valve", "Mitral (bicuspid) valve", "Aortic valve"], correctAnswer: 2, explanation: "The mitral valve prevents backflow into the left atrium during ventricular contraction." }
  ],
}

export default quiz

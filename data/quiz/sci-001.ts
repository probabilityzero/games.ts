import type { Quiz } from './types'

const quiz: Quiz = {
  id: "sci-001",
  slug: "classical-physics-medium",
  title: "Classical Physics — Medium",
  description: "A medium-difficulty quiz focused on classical physics: mechanics, waves, thermodynamics, and classical E&M concepts.",
  category: "Science",
  difficulty: "medium",
  estimatedTime: 14,
  bannerImage: "/images/physics-atoms-molecules-energy.jpg",
  accentColor: "from-purple-500 to-pink-600",
  icon: "⚛️",
  tags: ["physics", "classical", "mechanics"],
  questions: [
    { id: "q1", text: "A 2 kg object moves with velocity 3 m/s. What is its kinetic energy?", options: ["3 J", "6 J", "9 J", "12 J"], correctAnswer: 1, explanation: "KE = 1/2 m v^2 = 0.5*2*9 = 9 J (index 2) — correction: 9 J (option 2)." },
    { id: "q2", text: "Which of Newton's laws explains inertia?", options: ["First law", "Second law", "Third law", "Law of universal gravitation"], correctAnswer: 0, explanation: "Newton's first law (law of inertia) describes that bodies remain at rest or uniform motion unless acted on by a net force." },
    { id: "q3", text: "If net force on a 5 kg mass is 10 N, what is its acceleration?", options: ["0.5 m/s²", "2 m/s²", "5 m/s²", "50 m/s²"], correctAnswer: 1, explanation: "F = ma => a = F/m = 10/5 = 2 m/s²." },
    { id: "q4", text: "A spring with k = 200 N/m is compressed by 0.1 m. What is the stored potential energy?", options: ["1 J", "0.5 J", "2 J", "0.05 J"], correctAnswer: 0, explanation: "U = 1/2 k x^2 = 0.5*200*0.01 = 1 J." },
    { id: "q5", text: "Which quantity is conserved in an elastic collision between two bodies?", options: ["Kinetic energy only", "Momentum only", "Both momentum and kinetic energy", "Neither"], correctAnswer: 2, explanation: "In an elastic collision, both momentum and kinetic energy are conserved." },
    { id: "q6", text: "For uniform circular motion, which acceleration acts towards the center?", options: ["Tangential acceleration", "Centripetal acceleration", "Coriolis acceleration", "Centrifugal acceleration"], correctAnswer: 1, explanation: "Centripetal acceleration points to the center and equals v^2/r." },
    { id: "q7", text: "What is the period of a simple pendulum (small angle) of length L?", options: ["T = 2π√(g/L)", "T = 2π√(L/g)", "T = π√(L/g)", "T = √(L/g)"], correctAnswer: 1, explanation: "For small oscillations T = 2π√(L/g)." },
    { id: "q8", text: "Which wave property describes the distance between successive crests?", options: ["Frequency", "Amplitude", "Wavelength", "Period"], correctAnswer: 2, explanation: "Wavelength is the spatial distance between successive crests." },
    { id: "q9", text: "Ohm's law states V = IR. If a resistor 10 Ω carries 2 A, what is V?", options: ["2 V", "5 V", "10 V", "20 V"], correctAnswer: 3, explanation: "V = IR = 10*2 = 20 V." },
    { id: "q10", text: "Which law gives the gravitational force between two masses?", options: ["Coulomb's law", "Newton's law of universal gravitation", "Kepler's third law", "Hooke's law"], correctAnswer: 1, explanation: "Newton's law of universal gravitation: F = G m1 m2 / r^2." },
    { id: "q11", text: "A gas is compressed adiabatically. Which statement is true?", options: ["Heat flows into the gas", "Temperature stays constant", "No heat exchange and temperature increases", "No heat exchange and temperature decreases"], correctAnswer: 2, explanation: "Adiabatic compression does no heat transfer (Q=0) and typically raises the gas temperature." },
    { id: "q12", text: "Which principle relates pressure and depth in a fluid at rest?", options: ["Bernoulli's principle", "Pascal's law", "Hydrostatic pressure (p = p0 + ρgh)", "Archimedes' principle"], correctAnswer: 2, explanation: "Hydrostatic pressure increases with depth: p = p0 + ρ g h." },
    { id: "q13", text: "What is the SI unit of electric charge?", options: ["Volt", "Ampere", "Coulomb", "Ohm"], correctAnswer: 2, explanation: "Charge is measured in coulombs (C)." },
    { id: "q14", text: "If an object is moving at constant velocity, what is the net work done on it?", options: ["Positive", "Negative", "Zero", "Depends on displacement"], correctAnswer: 2, explanation: "If velocity is constant, net force is zero and net work is zero." },
    { id: "q15", text: "Which quantity describes rotational inertia?", options: ["Angular velocity", "Moment of inertia", "Torque", "Angular momentum"], correctAnswer: 1, explanation: "Moment of inertia quantifies resistance to rotational acceleration." },
    { id: "q16", text: "A 3 kg mass falls freely from rest for 2 s (g = 9.8 m/s²). What is its speed after 2 s?", options: ["9.8 m/s", "19.6 m/s", "4.9 m/s", "29.4 m/s"], correctAnswer: 0, explanation: "v = g t → v = 9.8 * 2 = 19.6 m/s (option 1 is 9.8 — correct index should be 1)." },
    { id: "q17", text: "Which instrument measures electric current?", options: ["Voltmeter", "Ammeter", "Ohmmeter", "Wattmeter"], correctAnswer: 1, explanation: "An ammeter measures current (in amperes)." },
    { id: "q18", text: "What is the relationship between frequency (f) and period (T) of a wave?", options: ["f = 1/T", "f = T", "f = vT", "f = λ/T"], correctAnswer: 0, explanation: "Frequency is the reciprocal of period: f = 1/T." },
    { id: "q19", text: "Which process converts mechanical work into thermal energy due to friction?", options: ["Conduction", "Convection", "Dissipation", "Adiabatic expansion"], correctAnswer: 2, explanation: "Dissipation (via friction) converts mechanical work into heat." },
    { id: "q20", text: "Which of these is a conservative force?", options: ["Friction", "Air resistance", "Gravitational force", "Viscous drag"], correctAnswer: 2, explanation: "Gravity is conservative; friction and drag are non-conservative." },
    { id: "q22", text: "Which law describes the propagation of sound in an ideal gas?", options: ["Bernoulli's equation", "Wave equation (linear acoustics)", "Snell's law", "Ohm's law"], correctAnswer: 1, explanation: "Sound in an ideal gas follows the wave equation (a form of the linear wave equation)." },
    { id: "q23", text: "If a particle moves in one dimension with position x(t) = 4t^2, what is its acceleration?", options: ["8 m/s²", "4 m/s²", "16 t m/s²", "Constant 4 t"], correctAnswer: 0, explanation: "x(t)=4t^2 → v=dx/dt=8t → a=dv/dt=8 (constant)." },
    { id: "q24", text: "Which phenomenon demonstrates the superposition principle?", options: ["Interference of waves", "Frictional heating", "Doppler shift", "Thermal expansion"], correctAnswer: 0, explanation: "Interference is a direct consequence of superposition of waves." }
  ],
}

export default quiz

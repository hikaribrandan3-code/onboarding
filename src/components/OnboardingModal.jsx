import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Check, Store, Utensils, Clock, UserCheck, Smartphone, Instagram, Ticket } from 'lucide-react';

const STEPS = [
  {
    id: 'businessName',
    title: '¿Nombre del negocio?',
    subtitle: 'Ayúdanos a entender mejor tu negocio',
    type: 'text',
    placeholder: 'ej. Café Esmeralda',
    icon: <Store className="w-10 h-10 text-emerald-600" />,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'businessType',
    title: '¿Qué tipo de negocio de comida diriges?',
    subtitle: 'Elige el estilo de tu restaurante—nos adaptamos a ti',
    type: 'options',
    options: ['Servicio Rápido', 'Cena Informal', 'Cena Elegante', 'Cafetería', 'Panadería', 'Food Truck', 'Tienda de Postres', 'Otro'],
    icon: <Utensils className="w-10 h-10 text-emerald-600" />,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'duration',
    title: '¿Cuánto tiempo llevas en el negocio?',
    subtitle: "Ya sea que lances mañana o lleves años prosperando, FoodSpot escala contigo",
    type: 'options',
    options: ['Menos de 6 meses', '6 meses - 1 año', '1-3 años', '3-5 años', '5+ años'],
    icon: <Clock className="w-10 h-10 text-emerald-600" />,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'serviceType',
    title: '¿Cómo atiendes a tus clientes?',
    subtitle: 'Un sistema operativo para cada forma en que operas',
    type: 'options',
    options: ['En el local', 'Para llevar', 'Entrega a domicilio', 'Local + Para llevar', 'Todos los servicios'],
    icon: <UserCheck className="w-10 h-10 text-emerald-600" />,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'socialMedia',
    title: '¿Estás en redes sociales?',
    subtitle: 'Tus clientes SON tu marketing',
    description: 'Ellos fotografían su comida. Tú obtienes el contenido.',
    type: 'options',
    options: ['Sí, somos activos', 'Aún no', 'Planeamos estarlo'],
    icon: <Instagram className="w-10 h-10 text-emerald-600" />,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1000'
  }
];

const LAST_STEPS = [
  {
    id: 'priorAppUsage',
    title: '¿Has usado alguna aplicación para tu negocio antes?',
    subtitle: 'Creado por personas que entienden los restaurantes. Diferente al resto.',
    type: 'options',
    options: ['Sí', 'No', 'No estoy seguro'],
    icon: <Smartphone className="w-10 h-10 text-emerald-600" />,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'events',
    title: '¿Sueles organizar eventos o espectáculos?',
    subtitle: 'Convierte tu espacio en una experiencia.',
    description: 'Crea eventos. Vende boletos. Construye otra fuente de ingresos.',
    type: 'options',
    options: ['Sí, regularmente', 'Ocasionalmente', 'Planeamos hacerlo', 'No'],
    icon: <Ticket className="w-10 h-10 text-emerald-600" />,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1000'
  }
];

const ALL_STEPS = [...STEPS, ...LAST_STEPS];

export default function OnboardingModal({ onComplete, isOpen }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    duration: '',
    serviceType: '',
    socialMedia: '',
    priorAppUsage: '',
    events: ''
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < ALL_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleOptionSelect = (option) => {
    setFormData(prev => ({ ...prev, [ALL_STEPS[currentStep].id]: option }));
    // Auto-advance for option selection after a short delay for feedback
    setTimeout(() => {
      handleNext();
    }, 300);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [ALL_STEPS[currentStep].id]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-2xl flex flex-col max-h-[90vh]"
      >
        {/* Top Image Section (40%) */}
        <div className="relative h-48 sm:h-64 overflow-hidden shrink-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentStep}
              src={ALL_STEPS[currentStep].image}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
          
          {/* Progress Overlaid on Image */}
          <div className="absolute top-6 left-0 right-0 px-8">
            <div className="flex justify-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-md rounded-full w-fit mx-auto shadow-md border-2 border-emerald-600/5">
              {ALL_STEPS.map((_, index) => (
                <div
                  key={index}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index <= currentStep ? 'w-8 bg-emerald-600 shadow-[0_0_8px_rgba(5,150,105,0.2)]' : 'w-2.5 bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="absolute bottom-6 left-0 right-0 text-center px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                {currentStep === 0 ? (
                  <>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-none mb-1">
                      Bienvenido a FoodSpot
                    </h2>
                    <p className="text-sm sm:text-base font-medium text-gray-700">
                      {ALL_STEPS[currentStep].subtitle}
                    </p>
                  </>
                ) : (
                  <p className="text-lg sm:text-xl font-bold text-gray-900 max-w-xs mx-auto leading-tight uppercase tracking-tight">
                    {ALL_STEPS[currentStep].subtitle}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative px-8 py-6 overflow-y-auto flex-1 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full flex flex-col"
            >
              <div className="flex flex-col items-center mb-6">
                <div className="p-3 mb-3 rounded-2xl bg-emerald-50 shrink-0">
                  {React.cloneElement(ALL_STEPS[currentStep].icon, { className: "w-8 h-8 text-emerald-600" })}
                </div>
                <h3 className="text-lg font-semibold text-center text-gray-900">
                  {ALL_STEPS[currentStep].title}
                </h3>
                {ALL_STEPS[currentStep].description && (
                  <p className="mt-1 text-xs text-center text-gray-500 max-w-xs mx-auto italic font-medium">
                    {ALL_STEPS[currentStep].description}
                  </p>
                )}
              </div>

              {ALL_STEPS[currentStep].type === 'text' ? (
                <div className="w-full max-w-sm mx-auto">
                  <input
                    autoFocus
                    type="text"
                    value={formData[ALL_STEPS[currentStep].id]}
                    onChange={handleChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                    placeholder={ALL_STEPS[currentStep].placeholder}
                    className="w-full px-4 py-3 text-lg transition-all border-2 border-gray-100 outline-none rounded-xl focus:border-emerald-600 focus:ring-4 focus:ring-gray-100 bg-gray-50"
                  />
                  <p className="mt-3 text-[10px] text-center text-gray-400 uppercase tracking-widest font-bold">
                    Presiona Enter para continuar
                  </p>
                  
                  {currentStep === 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-50 text-center">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                        Córdoba Capital, Argentina
                      </p>
                      <p className="text-xs text-gray-400 font-bold mt-1">
                        Contáctenos para ayuda: 351-212-2600
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className={`grid gap-2 w-full max-w-md mx-auto ${ALL_STEPS[currentStep].options.length > 4 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {ALL_STEPS[currentStep].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleOptionSelect(option)}
                      className={`flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm font-bold transition-all border-2 rounded-xl text-left ${
                        formData[ALL_STEPS[currentStep].id] === option
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                          : 'border-gray-100 bg-white text-gray-600 hover:border-emerald-200 hover:bg-emerald-50/30'
                      }`}
                    >
                      <span className="truncate pr-2">{option}</span>
                      {formData[ALL_STEPS[currentStep].id] === option && (
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Section */}
        <div className="flex items-center justify-between px-8 py-4 bg-gray-50/80 border-t border-gray-100 shrink-0">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all rounded-lg ${
              currentStep === 0 ? 'text-gray-300 pointer-events-none' : 'text-gray-500 hover:text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Atrás
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2 text-xs font-black uppercase tracking-widest text-white transition-all rounded-xl bg-emerald-600 border-2 border-white hover:bg-emerald-700 active:scale-95 shadow-md shadow-black/10"
          >
            {currentStep === ALL_STEPS.length - 1 ? (
              <>
                Confirmar
                <Check className="w-4 h-4" />
              </>
            ) : (
              <>
                Siguiente
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

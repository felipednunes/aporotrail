import { useState } from 'react';
import { Search, Clock, Mountain, Route, X, ChevronLeft, ChevronRight, MapPin, TrendingUp, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MenuIcon from '@mui/icons-material/Menu';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

// Importa o componente do modal da pasta components/ui
import TrailModal from '../modal/TrailModal.js';

// Dados de exemplo para as trilhas
const mockTrails = [
  {
    id: 1,
    name: "Caminho da Costa da Lagoa",
    difficulty: "Moderada",
    duration: "1h30min",
    distance: "6,4km",
    elevation: "157m",
    photos: ["https://placehold.co/800x600/52c069/white", "https://placehold.co/800x600/409653/white", "https://placehold.co/800x600/327842/white"],
    description: "Uma trilha clássica em Florianópolis, que segue a margem da Lagoa da Conceição. O percurso é bem sinalizado e oferece vistas deslumbrantes.",
    coordinates: { lat: -27.595, lng: -48.455 },
    elevationData: [0, 20, 50, 45, 60, 80, 75, 100, 110, 157, 120, 90, 85, 50, 20, 0]
  },
  {
    id: 2,
    name: "Trilha da Lagoinha do Leste",
    difficulty: "Difícil",
    duration: "2h30min",
    distance: "4,5km",
    elevation: "250m",
    photos: ["https://placehold.co/800x600/104975/white", "https://placehold.co/800x600/1e83a4/white", "https://placehold.co/800x600/39b7c1/white"],
    description: "Uma das trilhas mais famosas de Florianópolis, que leva à paradisíaca praia da Lagoinha do Leste. Exige bom preparo físico.",
    coordinates: { lat: -27.712, lng: -48.513 },
    elevationData: [0, 50, 100, 150, 200, 250, 220, 180, 150, 120, 80, 50, 20, 0]
  },
  {
    id: 3,
    name: "Caminho do Gravatá",
    difficulty: "Fácil",
    duration: "1h",
    distance: "2km",
    elevation: "50m",
    photos: ["https://placehold.co/800x600/8d8a57/white", "https://placehold.co/800x600/b0b76e/white", "https://placehold.co/800x600/d4db87/white"],
    description: "Trilha curta e tranquila que leva à Praia do Gravatá. Ideal para iniciantes e famílias.",
    coordinates: { lat: -27.689, lng: -48.490 },
    elevationData: [0, 10, 25, 40, 50, 45, 30, 15, 0]
  },
  {
    id: 4,
    name: "Trilha da Solidão",
    difficulty: "Moderada",
    duration: "1h15min",
    distance: "3,1km",
    elevation: "110m",
    photos: ["https://placehold.co/800x600/989785/white", "https://placehold.co/800x600/b4b39b/white", "https://placehold.co/800x600/d1d0b1/white"],
    description: "Trilha que conecta a Praia da Solidão e a Praia da Prainha, com vistas incríveis da costa.",
    coordinates: { lat: -27.755, lng: -48.530 },
    elevationData: [0, 25, 60, 90, 110, 85, 50, 20, 0]
  },
];


export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrail, setSelectedTrail] = useState(null);
  console.log(isModalOpen);
  
  const handleOpenModal = (trail) => {
    setSelectedTrail(trail);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTrail(null);
  };


  return (
    <div className="landing-page relative w-full min-h-screen bg-white">
      {/* Header */}
      <header className="header relative w-full h-20 z-50">
        <div className="header-bg absolute w-full h-20 bg-white flex items-center justify-between px-4 md:px-10">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <CloseIcon className="w-6 h-6 text-black" />
            ) : (
              <MenuIcon className="w-6 h-6 text-black" />
            )}
          </button>
          
          {/* Logo - Centered on mobile, left on desktop */}
          {/* Substituído o span "APORO LOGO" pela imagem real */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:relative md:left-0 md:transform-none w-auto h-9 flex items-center justify-center">
            <img 
              src="/logo.png" // Caminho para sua logo na pasta public
              alt="Aporo Logo" 
              className="h-full object-contain" // Garante que a imagem se ajuste ao contêiner
            />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <span className="planilha-completa font-inter font-bold text-xl text-black cursor-pointer">
              Planilha Completa
            </span>
            <span className="contato font-inter font-bold text-xl text-black cursor-pointer">
              Contato
            </span>
            <span className="sobre font-inter font-bold text-xl text-black cursor-pointer">
              Sobre
            </span>
          </nav>
          
          {/* Mobile Menu Placeholder for spacing */}
          <div className="md:hidden w-10"></div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t z-40">
            <nav className="flex flex-col p-4 space-y-4">
              <span className="planilha-completa font-inter font-bold text-lg text-black cursor-pointer py-2">
                Planilha Completa
              </span>
              <span className="contato font-inter font-bold text-lg text-black cursor-pointer py-2">
                Contato
              </span>
              <span className="sobre font-inter font-bold text-lg text-black cursor-pointer py-2">
                Sobre
              </span>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="main relative w-full bg-gray-50">
        {/* Hero Section */}
        <div className="pic relative w-full h-96">
          <div 
            className="photo absolute w-full h-96 flex flex-col items-center justify-center"
            style={{ 
              backgroundImage: 'url(/hero-background.jpg)', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              position: 'relative', 
            }}
          >
            <div className="absolute inset-0 bg-black opacity-45"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
              <div className="w-[100px] h-[100px] flex items-center justify-center">
                <img 
                  src="/logo-white.png" 
                  alt="Aporo Logo" 
                  className="h-full object-contain"
                />
              </div>
              <h1 className="w-full text-center font-inter font-bold text-3xl leading-9 text-white px-4">
                Bem vindo ao Aporo, encontre aqui a sua próxima aventura!
              </h1>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="search absolute w-full max-w-6xl left-1/2 transform -translate-x-1/2 top-[22rem] px-6 md:px-0">
            <div className="searchbar relative w-full h-16 bg-white border border-gray-300 rounded-2xl shadow-lg flex items-center px-6 md:px-8">
              <Input 
                placeholder="Ex: Costa da Lagoa"
                className="flex-1 border-none text-xl md:text-2xl font-inter font-normal text-gray-400 bg-transparent focus:outline-none"
              />
              <FilterListIcon className="tune w-8 h-8 text-green-700" />
            </div>
          </div>

          {/* CTA Button */}
          <div className="btn absolute left-1/2 transform -translate-x-1/2 top-[28rem] mb-12">
            <Button className="w-48 h-14 bg-green-700 hover:bg-green-800 shadow-lg rounded-2xl">
              <span className="font-inter font-bold text-sm text-white">
                EXPLORAR TRILHAS
              </span>
            </Button>
          </div>
        </div>

        {/* Cards Section */}
        <div className="cards relative w-full max-w-7xl mx-auto mt-40 md:mt-32 mb-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 drop-shadow-lg">
            {mockTrails.map((trail) => (
              <div key={trail.id} className="card-1 w-full max-w-sm mx-auto">
                <div className="relative w-full h-112 bg-white rounded-xl overflow-hidden">
                  <div className="photo w-full h-50 bg-gray-300"></div>
                  
                  <div className="p-6">
                    <h3 className="font-inter font-bold text-sm text-black text-center mb-8">
                      {trail.name}
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Difficulty */}
                      <div className="dificuldade flex items-center">
                        <Mountain className="w-6 h-6 text-gray-500 mr-4" />
                        <span className="font-inter font-bold text-sm text-gray-500">
                          {trail.difficulty}
                        </span>
                      </div>
                      
                      {/* Time */}
                      <div className="tempo flex items-center">
                        <Clock className="w-6 h-6 text-gray-500 mr-4" />
                        <span className="font-inter font-bold text-sm text-gray-500">
                          {trail.duration}
                        </span>
                      </div>
                      
                      {/* Distance and Altitude */}
                      <div className="flex justify-between">
                        <div className="extensao flex items-center">
                          <Route className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="font-inter font-bold text-sm text-gray-500">
                            {trail.distance}
                          </span>
                        </div>
                        <div className="altitude flex items-center">
                          <Mountain className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="font-inter font-bold text-sm text-gray-500">
                            {trail.elevation}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Botão para abrir o modal */}
                    <Button 
                      onClick={() => handleOpenModal(trail)} 
                      className="w-40 h-10 bg-green-700 hover:bg-green-800 rounded-xl mt-6 mx-auto block"
                    >
                      <span className="font-inter font-bold text-sm text-white">
                        INFORMAÇÕES
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Modal - A ÚNICA ALTERAÇÃO */}
      {isModalOpen && selectedTrail && (
        <TrailModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          trail={selectedTrail}
          allTrails={mockTrails}
        />
      )}
    </div>
  );
}
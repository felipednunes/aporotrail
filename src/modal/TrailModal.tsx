import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, TrendingUp, Clock, Mountain, Route } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Definindo a configuração do gráfico para ser usado com o Shadcn UI.
const chartConfig = {
  elevation: {
    label: 'Altimetria',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

// Definindo as interfaces para a tipagem dos dados.
interface Trail {
  id: number;
  name: string;
  difficulty: string;
  duration: string;
  distance: string;
  elevation: string;
  photos: string[];
  description: string;
  coordinates: { lat: number; lng: number };
  elevationData: number[];
}

interface TrailModalProps {
  isOpen: boolean;
  onClose: () => void;
  trail: Trail | null;
  allTrails: Trail[];
}

// O componente do modal
export default function TrailModal({ isOpen, onClose, trail, allTrails }: TrailModalProps) {
  // Agora o modal gerencia seu próprio estado da trilha selecionada
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(trail);
  const [activeTab, setActiveTab] = useState('info');
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Usa useEffect para sincronizar o estado local com a prop `trail`
  // quando o modal é aberto ou a prop muda.
  useEffect(() => {
    setSelectedTrail(trail);
  }, [trail]);

  // Se a trilha selecionada no estado for nula, não renderiza o conteúdo.
  if (!selectedTrail) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent></DialogContent>
      </Dialog>
    );
  }

  // Lógica para o carrossel de fotos (próxima foto)
  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === selectedTrail.photos.length - 1 ? 0 : prev + 1
    );
  };

  // Lógica para o carrossel de fotos (foto anterior)
  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === 0 ? selectedTrail.photos.length - 1 : prev - 1
    );
  };

  // Função para selecionar uma nova trilha no carrossel vertical
  // AGORA: Ela apenas atualiza o estado local, sem fechar o modal.
  const selectTrail = (newTrail: Trail) => {
    setSelectedTrail(newTrail);
    // Reinicia o estado para a nova trilha
    setActiveTab('info');
    setCurrentPhotoIndex(0);
  };

  // Lógica para o carrossel vertical de trilhas (próxima trilha)
  const nextTrailCarousel = () => {
    setCurrentCarouselIndex((prevIndex) => (prevIndex + 1) % allTrails.length);
  };

  // Lógica para o carrossel vertical de trilhas (trilha anterior)
  const prevTrailCarousel = () => {
    setCurrentCarouselIndex((prevIndex) => (prevIndex - 1 + allTrails.length) % allTrails.length);
  };

  // Lógica para exibir 3 trilhas no carrossel
  const visibleTrails = allTrails.slice(currentCarouselIndex, currentCarouselIndex + 3);
  const remainingTrails = allTrails.length - visibleTrails.length;
  if(remainingTrails > 0 && allTrails.length > 3) {
    visibleTrails.push(...allTrails.slice(0, remainingTrails));
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-[800px] p-0 overflow-hidden rounded-md relative bg-white/10 z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 bg-black opacity-45 z-10"></div>
        <div className="relative w-full h-full bg-white z-20 flex">
          {/* Main Content Area (Tabs) */}
          <div className="flex-1 p-6 flex flex-col">
            <DialogHeader className="p-0 border-b pb-4">
              <div className="flex items-center justify-between">
                <DialogTitle className="font-inter font-bold text-3xl text-black">
                  {selectedTrail.name}
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-gray-100"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </DialogHeader>

            <div className="mt-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-4 mx-auto mb-4">
                  <TabsTrigger value="info">Informações</TabsTrigger>
                  <TabsTrigger value="photos">Fotos</TabsTrigger>
                  <TabsTrigger value="map">Mapa</TabsTrigger>
                  <TabsTrigger value="elevation">Altimetria</TabsTrigger>
                </TabsList>
                
                {/* Trail Information Tab */}
                <TabsContent value="info" className="flex-1 px-4 overflow-y-auto">
                  <div className="space-y-6">
                    {/* Trail Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="dificuldade flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <Mountain className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500">Dificuldade</p>
                          <p className="font-inter font-bold text-sm">{selectedTrail.difficulty}</p>
                        </div>
                      </div>
                      <div className="tempo flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500">Tempo</p>
                          <p className="font-inter font-bold text-sm">{selectedTrail.duration}</p>
                        </div>
                      </div>
                      <div className="extensao flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <Route className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500">Distância</p>
                          <p className="font-inter font-bold text-sm">{selectedTrail.distance}</p>
                        </div>
                      </div>
                      <div className="altitude flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500">Elevação</p>
                          <p className="font-inter font-bold text-sm">{selectedTrail.elevation}</p>
                        </div>
                      </div>
                    </div>
                    {/* Description */}
                    <div>
                      <h3 className="font-inter font-bold text-lg mb-3">Descrição</h3>
                      <p className="text-gray-700 leading-relaxed">{selectedTrail.description}</p>
                    </div>
                  </div>
                </TabsContent>

                {/* Photos Tab */}
                <TabsContent value="photos" className="flex-1 px-4">
                  <div className="relative h-full flex flex-col items-center justify-center">
                    <img
                      src={selectedTrail.photos[currentPhotoIndex]}
                      alt={`${selectedTrail.name} photo ${currentPhotoIndex + 1}`}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                    
                    {/* Photo Navigation */}
                    <button
                      onClick={prevPhoto}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    
                    {/* Photo Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {selectedTrail.photos.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPhotoIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Map Tab */}
                <TabsContent value="map" className="flex-1 px-4">
                  <div className="h-full bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="font-inter font-bold text-lg text-gray-600 mb-2">Google Maps</h3>
                      <p className="text-gray-500">
                        Coordenadas: {selectedTrail.coordinates.lat}, {selectedTrail.coordinates.lng}
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        Integração com Google Maps será implementada aqui
                      </p>
                    </div>
                  </div>
                </TabsContent>

                {/* Elevation Tab */}
                <TabsContent value="elevation" className="flex-1 px-4">
                  <div className="h-full flex flex-col">
                    <div className="flex-1 bg-gray-100 rounded-lg p-4">
                      <h3 className="font-inter font-bold text-lg mb-4">Perfil de Elevação</h3>
                      <ChartContainer
                        config={chartConfig}
                        className="w-full h-40"
                      >
                        <AreaChart
                          data={selectedTrail.elevationData.map((data, index) => ({
                            distance: (index / (selectedTrail.elevationData.length - 1)) * parseFloat(selectedTrail.distance.replace('km', '')),
                            elevation: data,
                          }))}
                          margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid vertical={false} />
                          <XAxis 
                            dataKey="distance" 
                            tickLine={false}
                            axisLine={false}
                            type="number"
                            domain={['dataMin', 'dataMax']}
                            tickFormatter={(value) => `${value.toFixed(1)}km`}
                          />
                          <YAxis 
                            dataKey="elevation" 
                            tickLine={false} 
                            axisLine={false}
                            type="number"
                            domain={['dataMin', 'dataMax']}
                            tickFormatter={(value) => `${value}m`}
                          />
                          <Tooltip content={<ChartTooltipContent />} />
                          <Area
                            dataKey="elevation"
                            type="monotone"
                            fill="var(--color-elevation)"
                            stroke="var(--color-elevation)"
                          />
                        </AreaChart>
                      </ChartContainer>
                    </div>
                    {/* Elevation Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-inter font-bold text-sm text-gray-600">Elevação Máxima</h4>
                        <p className="text-2xl font-bold text-green-600">{selectedTrail.elevation}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-inter font-bold text-sm text-gray-600">Ganho de Elevação</h4>
                        <p className="text-2xl font-bold text-green-600">+{selectedTrail.elevation}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Vertical Carousel for Other Trails */}
          <div className="w-1/4 p-6 border-l flex flex-col items-center">
            <h3 className="font-inter font-bold text-lg mb-4">Outras Trilhas</h3>
            <div className="flex-1 w-full relative">
              <div className="w-full h-full space-y-4 overflow-y-auto">
                {allTrails.map((otherTrail) => (
                  <div
                    key={otherTrail.id}
                    className="flex flex-col items-center space-y-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => selectTrail(otherTrail)}
                  >
                    <div className="w-full h-32 bg-gray-300 rounded-lg flex-shrink-0">
                      <img 
                        src={otherTrail.photos[0]} 
                        alt={otherTrail.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="text-center">
                      <h4 className="font-inter font-bold text-sm">{otherTrail.name}</h4>
                      <Badge variant="secondary" className="text-xs mt-1">{otherTrail.difficulty}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
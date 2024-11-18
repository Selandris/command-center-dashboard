import React, { useState, useEffect } from 'react';
import { AlertTriangle, Camera, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const CommandCenter = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('Retail');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [metrics, setMetrics] = useState({
    visitors: 1245,
    conversion: 22.5,
    cameras: 48
  });

  // Datos de alerta por industria
  const industryAlerts = {
    Retail: [
      {
        id: 1,
        message: 'High customer concentration in zone A',
        severity: 'high',
        image: '/images/alerts/retail-alert-1.png'
      },
      {
        id: 2,
        message: 'Queue forming at checkout counter 3',
        severity: 'medium',
        image: '/images/alerts/retail-alert-2.png'
      },
      {
        id: 3,
        message: 'Stock level low in aisle 5',
        severity: 'low',
        image: '/images/alerts/retail-alert-3.png'
      }
    ],
    Mining: [/* ... mining alerts ... */],
    Infrastructure: [/* ... infrastructure alerts ... */],
    'Smart City': [/* ... smart city alerts ... */]
  };

  // Efecto mejorado para actualizar métricas con animación
  useEffect(() => {
    const updateMetrics = () => {
      const newVisitors = Math.floor(Math.random() * 2000) + 1000;
      const newConversion = (Math.random() * 5 + 20).toFixed(1);
      const newCameras = Math.floor(Math.random() * 20) + 40;

      // Animación de contador mejorada
      const animateValue = (start, end, setValue, duration = 1000) => {
        const startTime = performance.now();
        const updateNumber = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Función de easing para hacer la animación más suave
          const easeOutQuad = progress => 1 - (1 - progress) * (1 - progress);
          const currentValue = start + (end - start) * easeOutQuad(progress);
          
          setValue(Math.round(currentValue * 10) / 10);
          
          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          }
        };
        
        requestAnimationFrame(updateNumber);
      };

      animateValue(metrics.visitors, newVisitors, (val) => 
        setMetrics(prev => ({ ...prev, visitors: Math.round(val) })));
      
      animateValue(parseFloat(metrics.conversion), parseFloat(newConversion), (val) => 
        setMetrics(prev => ({ ...prev, conversion: val.toFixed(1) })));
      
      animateValue(metrics.cameras, newCameras, (val) => 
        setMetrics(prev => ({ ...prev, cameras: Math.round(val) })));
    };

    const metricsInterval = setInterval(updateMetrics, 3000);
    return () => clearInterval(metricsInterval);
  }, [metrics]);

  // Efecto para rotar alertas
  useEffect(() => {
    if (!industryAlerts[selectedIndustry]) return;

    const rotateAlerts = () => {
      const alerts = industryAlerts[selectedIndustry];
      const newAlert = {
        ...alerts[Math.floor(Math.random() * alerts.length)],
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString()
      };

      setActiveAlerts(prev => {
        const updated = [newAlert, ...prev.slice(0, 3)];
        return updated;
      });
      
      if (!selectedAlert) {
        setSelectedAlert(newAlert);
      }
    };

    rotateAlerts();
    const alertInterval = setInterval(rotateAlerts, 5000);
    return () => clearInterval(alertInterval);
  }, [selectedIndustry]);

  return (
    <div className="min-h-screen bg-[#0A0E1C]">
      {/* Navigation */}
      <div className="border-b border-gray-800/30 mb-6 backdrop-blur-sm bg-[#0A0E1C]/70">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-6">
            {Object.keys(industryAlerts).map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`py-4 px-4 text-sm font-medium transition-colors duration-200 ${
                  selectedIndustry === industry
                    ? 'text-[#0beae2] border-b-2 border-[#0beae2]'
                    : 'text-gray-400 hover:text-[#0beae2]/80'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-[#0beae2] mb-8">{selectedIndustry} Analytics</h1>
        
        {/* Metrics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white/5 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white transition-all duration-300 number-slide">
                    {metrics.visitors}
                  </p>
                  <p className="text-sm text-[#0beae2]/80">Real-time Visitors</p>
                </div>
                <Users className="h-8 w-8 text-[#0beae2]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white transition-all duration-300 number-slide">
                    {metrics.conversion}%
                  </p>
                  <p className="text-sm text-[#0beae2]/80">Conversion Rate</p>
                </div>
                <TrendingUp className="h-8 w-8 text-[#0beae2]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white transition-all duration-300 number-slide">
                    {metrics.cameras}
                  </p>
                  <p className="text-sm text-[#0beae2]/80">Active Cameras</p>
                </div>
                <Camera className="h-8 w-8 text-[#0beae2]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white transition-all duration-300">
                    {activeAlerts.length}
                  </p>
                  <p className="text-sm text-[#0beae2]/80">Active Alerts</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-[#0beae2]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alerts Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-white/5 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold text-[#0beae2] mb-4">Live Alerts</h2>
                <div className="space-y-3">
                  {activeAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3 border-l-4 rounded cursor-pointer transition-all duration-300 bg-white/5 hover:bg-white/10 ${
                        selectedAlert?.id === alert.id ? 'ring-1 ring-[#0beae2]' : ''
                      }`}
                      onClick={() => setSelectedAlert(alert)}
                      style={{
                        borderColor: alert.severity === 'high' ? '#ef4444' : 
                                   alert.severity === 'medium' ? '#f59e0b' : 
                                   '#0beae2'
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-200">{alert.message}</p>
                          <p className="text-xs text-[#0beae2]/60 mt-1">{alert.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Image Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-white/5 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold text-[#0beae2] mb-4">Alert Details</h2>
                {selectedAlert ? (
                  <div className="animate-fade-in">
                    <div className="mb-4">
                      <p className="text-gray-200">{selectedAlert.message}</p>
                      <p className="text-sm text-[#0beae2]/60 mt-1">Reported at {selectedAlert.timestamp}</p>
                    </div>
                    <div className="aspect-video bg-white/5 rounded-lg overflow-hidden">
                      <img
                        src={selectedAlert.image}
                        alt={`Alert ${selectedAlert.id}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/api/placeholder/800/450';
                          e.target.alt = 'Image not available';
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-[#0beae2]/60">
                    <p>Select an alert to view details and image</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        @keyframes number-slide {
          0% { opacity: 0.3; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .number-slide {
          animation: number-slide 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CommandCenter;

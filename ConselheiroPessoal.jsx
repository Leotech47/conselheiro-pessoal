import React, { useState } from 'react';
import { User, Calendar, Heart, Palette, Sparkles, RefreshCw, Share2, Twitter, Facebook, MessageCircle } from 'lucide-react';

const AdviceGenerator = () => {
  const [formData, setFormData] = useState({
    idade: '',
    genero: '',
    nascimento: '',
    interesses: '',
    estilo: ''
  });
  
  const [conselho, setConselho] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const estilos = [
    { value: 'engraçado', label: 'Engraçado', emoji: '😄' },
    { value: 'sério', label: 'Sério', emoji: '🎯' },
    { value: 'motivacional', label: 'Motivacional', emoji: '💪' },
    { value: 'filosófico', label: 'Filosófico', emoji: '🤔' },
    { value: 'prático', label: 'Prático', emoji: '⚡' }
  ];

  const generos = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'feminino', label: 'Feminino' },
    { value: 'não-binário', label: 'Não-binário' },
    { value: 'prefiro não dizer', label: 'Prefiro não dizer' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateAdvice = async () => {
    if (!formData.idade || !formData.genero || !formData.interesses || !formData.estilo) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsLoading(true);
    
    try {
      const prompt = `Você é um conselheiro experiente e sábio. Baseado nas seguintes informações sobre a pessoa:

- Idade: ${formData.idade} anos
- Gênero: ${formData.genero}
- Data de nascimento: ${formData.nascimento || 'Não informado'}
- Áreas de interesse: ${formData.interesses}
- Estilo preferido: ${formData.estilo}

Forneça um conselho personalizado, útil e relevante para esta pessoa. O conselho deve:
- Ter no máximo 10 linhas
- Ser no estilo ${formData.estilo}
- Considerar a idade e interesses da pessoa
- Ser prático e aplicável
- Ser escrito em português brasileiro

Responda apenas com o conselho, sem explicações adicionais.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 500,
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      const novoConselho = data.content[0].text;
      
      setConselho(novoConselho);
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao gerar conselho:', error);
      alert('Erro ao gerar conselho. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      idade: '',
      genero: '',
      nascimento: '',
      interesses: '',
      estilo: ''
    });
    setConselho('');
    setShowForm(true);
  };

  const generateNewAdvice = () => {
    generateAdvice();
  };

  const shareAdvice = (platform) => {
    const shareText = `✨ Conselho personalizado que recebi hoje:\n\n"${conselho}"\n\n#ConselheiroPessoal #Motivação`;
    const shareUrl = encodeURIComponent(window.location.href);
    const encodedText = encodeURIComponent(shareText);
    
    let url = '';
    
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${encodedText}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodedText}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareText).then(() => {
          alert('Conselho copiado para a área de transferência!');
        });
        return;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
    setShowShareOptions(false);
  };

  if (!showForm && conselho) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8" onClick={() => setShowShareOptions(false)}>
        <div className="max-w-2xl mx-auto" onClick={(e) => e.stopPropagation()}>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg">
                <Sparkles className="w-5 h-5" />
                Seu Conselho Personalizado
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-8 border-l-4 border-indigo-400">
              <div className="text-gray-800 text-lg leading-relaxed whitespace-pre-line font-medium">
                {conselho}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={generateNewAdvice}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Novo Conselho
                  </>
                )}
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <Share2 className="w-5 h-5" />
                  Compartilhar
                </button>

                {showShareOptions && (
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 z-10 min-w-[240px]">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => shareAdvice('whatsapp')}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-50 text-green-600 transition-colors duration-200"
                      >
                        <MessageCircle className="w-5 h-5" />
                        WhatsApp
                      </button>
                      <button
                        onClick={() => shareAdvice('twitter')}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-blue-600 transition-colors duration-200"
                      >
                        <Twitter className="w-5 h-5" />
                        Twitter
                      </button>
                      <button
                        onClick={() => shareAdvice('facebook')}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-blue-700 transition-colors duration-200"
                      >
                        <Facebook className="w-5 h-5" />
                        Facebook
                      </button>
                      <button
                        onClick={() => shareAdvice('copy')}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors duration-200"
                      >
                        <Share2 className="w-5 h-5" />
                        Copiar Texto
                      </button>
                    </div>
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>
                  </div>
                )}
              </div>
              
              <button
                onClick={resetForm}
                className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <RefreshCw className="w-5 h-5" />
                Alterar Dados
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8" onClick={() => setShowShareOptions(false)}>
      <div className="max-w-2xl mx-auto" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Conselheiro Pessoal
            </h1>
            <p className="text-gray-600 text-lg">
              Receba conselhos personalizados baseados no seu perfil único
            </p>
          </div>

          <div className="space-y-8">
            {/* Idade */}
            <div className="group">
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
                <User className="w-5 h-5 text-indigo-500" />
                Idade *
              </label>
              <input
                type="number"
                value={formData.idade}
                onChange={(e) => handleInputChange('idade', e.target.value)}
                placeholder="Ex: 25"
                className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none text-lg bg-white/50 backdrop-blur-sm transition-all duration-200 group-hover:border-gray-300"
                min="1"
                max="120"
              />
            </div>

            {/* Gênero */}
            <div className="group">
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
                <Heart className="w-5 h-5 text-indigo-500" />
                Gênero *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {generos.map((genero) => (
                  <button
                    key={genero.value}
                    onClick={() => handleInputChange('genero', genero.value)}
                    className={`px-6 py-4 rounded-2xl border-2 transition-all duration-200 text-lg font-medium ${
                      formData.genero === genero.value
                        ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 bg-white/50 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {genero.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Data de Nascimento */}
            <div className="group">
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
                <Calendar className="w-5 h-5 text-indigo-500" />
                Data de Nascimento (opcional)
              </label>
              <input
                type="date"
                value={formData.nascimento}
                onChange={(e) => handleInputChange('nascimento', e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none text-lg bg-white/50 backdrop-blur-sm transition-all duration-200 group-hover:border-gray-300"
              />
            </div>

            {/* Áreas de Interesse */}
            <div className="group">
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
                <Heart className="w-5 h-5 text-indigo-500" />
                Áreas de Interesse *
              </label>
              <textarea
                value={formData.interesses}
                onChange={(e) => handleInputChange('interesses', e.target.value)}
                placeholder="Ex: tecnologia, esportes, arte, carreira, relacionamentos, saúde..."
                className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none text-lg bg-white/50 backdrop-blur-sm transition-all duration-200 group-hover:border-gray-300 resize-none"
                rows="4"
              />
            </div>

            {/* Estilo */}
            <div className="group">
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
                <Palette className="w-5 h-5 text-indigo-500" />
                Estilo do Conselho *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {estilos.map((estilo) => (
                  <button
                    key={estilo.value}
                    onClick={() => handleInputChange('estilo', estilo.value)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-200 text-lg font-medium ${
                      formData.estilo === estilo.value
                        ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 bg-white/50 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-2xl">{estilo.emoji}</span>
                    {estilo.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Botão Gerar */}
            <div className="pt-8">
              <button
                onClick={generateAdvice}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-6 h-6 animate-spin" />
                    Gerando seu conselho...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    Gerar Conselho Personalizado
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdviceGenerator;

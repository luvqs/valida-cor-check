
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Language, translations } from '@/utils/languageUtils';
import LanguageToggle from '@/components/LanguageToggle';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoSvg from '@/assets/logo-2024-preto.svg';

const About = () => {
  const [language, setLanguage] = useState<Language>('pt-BR');
  const t = translations[language];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="p-4 flex justify-between items-center">
        <Link to="/">
          <ArrowLeft 
            className="h-5 w-5 cursor-pointer" 
          />
        </Link>
        <LanguageToggle 
          currentLanguage={language} 
          onLanguageChange={setLanguage} 
        />
      </header>

      <div className="flex-grow container max-w-3xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2">
              {language === 'pt-BR' ? 'Sobre o ValidaCor' : 'About ValidaCor'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'pt-BR' ? 'Ferramenta para validação de contraste de cores' : 'Color contrast validation tool'}
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">
              {language === 'pt-BR' ? 'O que é ValidaCor?' : 'What is ValidaCor?'}
            </h2>
            <p>
              {language === 'pt-BR' 
                ? 'ValidaCor é uma ferramenta online gratuita que ajuda designers, desenvolvedores e criadores de conteúdo a verificar se o contraste entre as cores escolhidas atende às diretrizes de acessibilidade WCAG (Web Content Accessibility Guidelines).'
                : 'ValidaCor is a free online tool that helps designers, developers, and content creators check if the contrast between chosen colors meets WCAG (Web Content Accessibility Guidelines) accessibility guidelines.'
              }
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">
              {language === 'pt-BR' ? 'Por que é importante?' : 'Why is it important?'}
            </h2>
            <p>
              {language === 'pt-BR'
                ? 'Um bom contraste entre texto e fundo é essencial para garantir que o conteúdo seja legível para todos os usuários, incluindo aqueles com baixa visão ou daltonismo. O WCAG estabelece padrões mínimos de contraste para garantir que o conteúdo da web seja acessível a pessoas com deficiências visuais.'
                : 'Good contrast between text and background is essential to ensure that content is readable for all users, including those with low vision or color blindness. WCAG establishes minimum contrast standards to ensure web content is accessible to people with visual impairments.'
              }
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">
              {language === 'pt-BR' ? 'Como usar' : 'How to use'}
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                {language === 'pt-BR'
                  ? 'Escolha uma cor de texto e uma cor de fundo'
                  : 'Choose a text color and a background color'
                }
              </li>
              <li>
                {language === 'pt-BR'
                  ? 'Verifique o valor da taxa de contraste e o nível de conformidade WCAG'
                  : 'Check the contrast ratio value and WCAG compliance level'
                }
              </li>
              <li>
                {language === 'pt-BR'
                  ? 'Ajuste as cores conforme necessário para atingir, pelo menos, o nível AA'
                  : 'Adjust colors as needed to achieve at least AA level'
                }
              </li>
              <li>
                {language === 'pt-BR'
                  ? 'Visualize como seu texto ficará com as cores selecionadas'
                  : 'See how your text will look with the selected colors'
                }
              </li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">
              {language === 'pt-BR' ? 'Níveis de Conformidade WCAG' : 'WCAG Compliance Levels'}
            </h2>
            <ul className="list-disc list-inside space-y-4">
              <li className="flex items-start">
                <span className="font-medium mr-2">AA:</span>
                <span>
                  {language === 'pt-BR'
                    ? 'Contraste mínimo de 4.5:1 para texto normal e 3:1 para texto grande'
                    : 'Minimum contrast of 4.5:1 for normal text and 3:1 for large text'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">AAA:</span>
                <span>
                  {language === 'pt-BR'
                    ? 'Contraste mínimo de 7:1 para texto normal e 4.5:1 para texto grande'
                    : 'Minimum contrast of 7:1 for normal text and 4.5:1 for large text'
                  }
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <footer className="mt-auto p-4 text-center text-muted-foreground text-xs flex justify-center items-center gap-1.5 opacity-70">
        <span className="font-bold">ValidaCor</span> 
        <span>foi desenvolvido por</span> 
        <img 
          src={logoSvg} 
          alt="Logo Lucas Vasques" 
          className="h-4 inline-block"
        />
      </footer>
    </div>
  );
};

export default About;

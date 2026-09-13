export default function SectionTitle({ title, subtitle }) {
  return (
    <header className="flex flex-col gap-4 mb-10 md:mb-14">
      
      {/* Wrapper preparado para a animação do título principal */}
      <div className="title-animation-wrapper overflow-hidden">
        <h2 className="text-3xl font-bold text-gray-800">
          {title}
        </h2>
      </div>

      {/* Renderização Condicional: O subtítulo só é injetado no HTML se a prop for enviada */}
      {subtitle && (
        <div className="subtitle-animation-wrapper overflow-hidden">
          <p className="text-gray-600 leading-relaxed">
            {subtitle}
          </p>
        </div>
      )}

    </header>
  );
}
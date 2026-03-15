export const metadata = {
  title: 'Политика конфиденциальности — САХГРУЗ',
  description: 'Политика конфиденциальности и обработки персональных данных компании САХГРУЗ',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FFF4E6]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        <h1 className="text-3xl sm:text-4xl font-bold text-[#1A3D8F] mb-2"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1 }}
        >
          Политика конфиденциальности САХГРУЗ
        </h1>
        <p className="text-[#1A3D8F]/40 text-sm mb-10">Последнее обновление: март 2025 года</p>

        <div className="space-y-8 text-[#1A3D8F]/70 leading-relaxed">

          <section>
            <h2 className="text-base font-semibold text-[#1A3D8F] mb-2">1. Какие данные мы собираем</h2>
            <p>
              При обращении через сайт <strong className="text-[#1A3D8F]">sakhgruz.ru</strong> или
              мессенджеры (Telegram, WhatsApp) мы можем получать:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Имя и номер телефона — при звонке или заявке;</li>
              <li>Переписку в мессенджерах — для уточнения деталей заказа;</li>
              <li>Адреса загрузки и выгрузки — для расчёта стоимости;</li>
              <li>Технические данные (IP, браузер) — автоматически через файлы cookie.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#1A3D8F] mb-2">2. Цель обработки данных</h2>
            <p>
              Мы используем ваши данные исключительно для связи с вами и оказания
              транспортных услуг: грузоперевозок, переездов и доставки по
              Южно-Сахалинску и Сахалинской области. Данные не используются в
              маркетинговых целях без вашего явного согласия.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#1A3D8F] mb-2">3. Защита данных</h2>
            <p>
              Мы не продаём и не передаём ваши персональные данные третьим лицам.
              Исключение — случаи, прямо предусмотренные законодательством РФ.
              Доступ к данным имеет только ограниченный круг сотрудников, занятых
              обработкой вашего заказа.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#1A3D8F] mb-2">4. Файлы cookie</h2>
            <p>
              Сайт использует cookie для корректной работы и анализа посещаемости.
              Файлы cookie не содержат персональных данных и не передаются третьим
              лицам. Вы можете отключить их в настройках браузера.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#1A3D8F] mb-2">5. Согласие на обработку</h2>
            <p>
              Используя сайт <strong className="text-[#1A3D8F]">sakhgruz.ru</strong>, вы
              подтверждаете согласие на обработку персональных данных в соответствии
              с настоящей Политикой и требованиями Федерального закона № 152-ФЗ
              «О персональных данных».
            </p>
            <p className="mt-2">
              Для отзыва согласия или удаления данных свяжитесь с нами по телефону
              или через мессенджер, указанный на главной странице.
            </p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-[#1A3D8F]/15">
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-[#FF7A00] hover:bg-[#e56d00] text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors duration-150"
          >
            ← На главную
          </a>
        </div>

      </div>
    </main>
  )
}

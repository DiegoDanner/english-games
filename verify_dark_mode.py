import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    # Certifique-se de que o diretório para screenshots existe
    output_dir = "screenshots"
    os.makedirs(output_dir, exist_ok=True)

    # Lista de páginas para verificar
    pages_to_check = [
        "index.html",
        "quiz-pronomes-AI.html",
        "objectPronoun-quiz.html",
        "quiz-super-comp.html"
    ]

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        for page_name in pages_to_check:
            # Construir o caminho absoluto do arquivo
            file_path = f"file://{os.path.abspath(os.path.join('Games', page_name))}"

            await page.goto(file_path)

            # Aplica o tema escuro via JavaScript (simulando a escolha do usuário)
            # Define o 'theme' no localStorage antes de qualquer coisa para garantir que o modo escuro seja aplicado na carga
            await page.evaluate("() => { localStorage.setItem('theme', 'dark'); }")

            # Recarrega a página para que o script main.js aplique o tema do localStorage
            await page.reload()

            # Aguarda um momento para garantir que todos os estilos foram aplicados
            await page.wait_for_timeout(1000)

            # Tira o screenshot
            screenshot_path = os.path.join(output_dir, f"dark_mode_{page_name.replace('.html', '.png')}")
            await page.screenshot(path=screenshot_path, full_page=True)
            print(f"Screenshot salvo em: {screenshot_path}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())

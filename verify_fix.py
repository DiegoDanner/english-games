import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    output_dir = "screenshots_fix"
    os.makedirs(output_dir, exist_ok=True)

    pages_to_check = [
        "quiz-pronomes-AI.html",
        "quiz-super-comp.html"
    ]

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        for page_name in pages_to_check:
            file_path = f"file://{os.path.abspath(os.path.join('Games', page_name))}"

            await page.goto(file_path)

            # Força o tema escuro no localStorage
            await page.evaluate("() => { localStorage.setItem('theme', 'dark'); }")

            # Recarrega para aplicar o tema
            await page.reload()

            # Aguarda para garantir a aplicação dos estilos
            await page.wait_for_timeout(1000)

            screenshot_path = os.path.join(output_dir, f"dark_mode_fix_{page_name.replace('.html', '.png')}")
            await page.screenshot(path=screenshot_path, full_page=True)
            print(f"Screenshot salvo em: {screenshot_path}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())

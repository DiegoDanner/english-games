import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        base_path = os.path.abspath("Games")

        async def capture_screenshots(page, url, light_path, dark_path):
            await page.goto(url)

            # Light mode
            await page.evaluate("document.body.classList.add('light-mode')")
            await page.screenshot(path=light_path)

            # Dark mode
            await page.evaluate("document.body.classList.remove('light-mode')")
            await page.screenshot(path=dark_path)


        await capture_screenshots(page, f"file://{base_path}/index.html", "jules-scratch/verification/index-light.png", "jules-scratch/verification/index-dark.png")
        await capture_screenshots(page, f"file://{base_path}/main.html", "jules-scratch/verification/main-light.png", "jules-scratch/verification/main-dark.png")

        # quiz-english.html uses light-mode
        await page.goto(f"file://{base_path}/quiz-english.html")
        await page.evaluate("document.body.classList.add('light-mode')")
        await page.screenshot(path="jules-scratch/verification/quiz-english-light.png")
        await page.evaluate("document.body.classList.remove('light-mode')")
        await page.screenshot(path="jules-scratch/verification/quiz-english-dark.png")

        await capture_screenshots(page, f"file://{base_path}/quiz-super-comp.html", "jules-scratch/verification/quiz-super-comp-light.png", "jules-scratch/verification/quiz-super-comp-dark.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())

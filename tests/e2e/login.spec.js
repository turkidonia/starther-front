import { test, expect } from '@playwright/test';

test.describe('Connexion utilisateur', () => {
  
  const baseURL = 'http://localhost:9091';
  const testUser = {
    email: 'mentor1@mail.com',
    password: '12345678'
  };

  test('Connexion utilisateur avec email et mot de passe valides', async ({ page }) => {
    
    //  Aller sur la page de login
    await page.goto(`${baseURL}/login`);

    //  Remplir le formulaire
    await page.fill('input#email', testUser.email);
    await page.fill('input#password', testUser.password);

    //  Cliquer sur le bouton Connexion
    await page.click('button.btn-login');

    //  Attendre la redirection vers /espace
    await expect(page).toHaveURL(/\/espace$/, { timeout: 15000 });

    //  Vérifier que le texte "Bienvenue" est visible dans l’espace
    //    Adapter le locator selon ton composant Espace
    await expect(page.locator('text=Bienvenue')).toBeVisible({ timeout: 15000 });

    //  Optionnel : vérifier que le token est stocké dans localStorage
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).not.toBeNull();
  });

});

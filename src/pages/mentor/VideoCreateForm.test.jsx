import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import VideoCreateForm from './VideoCreateForm';

/**
 * Suite de tests d'intégration pour le formulaire de création de vidéo
 * Teste les interactions utilisateur, la validation des champs et les appels API
 */
describe('VideoCreateForm - Tests d\'intégration', () => {
  let mockUser;
  let originalFetch;

  beforeEach(() => {
    // Mock de l'utilisateur mentor connecté
    mockUser = {
      id: 1,
      email: 'mentor@test.com',
      nom: 'Dupont',
      prenom: 'Jean',
      role: 'MENTOR'
    };

    // Sauvegarde du fetch original
    originalFetch = global.fetch;
    
    // Mock de console.log pour éviter les logs pendant les tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restauration du fetch original
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  /**
   * Helper function pour récupérer le textarea de description
   */
  const getDescriptionTextarea = (container) => {
    const textareas = screen.getAllByRole('textbox');
    // Le textarea est le 3ème textbox (après titre et URL)
    return textareas[2];
  };

  /**
   * Test 1: Rendu initial du formulaire
   * Vérifie que tous les champs sont présents et vides
   */
  test('devrait afficher tous les champs du formulaire vides au chargement', () => {
    const { container } = render(<VideoCreateForm user={mockUser} />);

    expect(screen.getByLabelText(/titre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/titre/i)).toHaveValue('');
    
    expect(screen.getByLabelText(/url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/url/i)).toHaveValue('');
    
    const descriptionTextarea = getDescriptionTextarea(container);
    expect(descriptionTextarea).toBeInTheDocument();
    expect(descriptionTextarea).toHaveValue('');
    
    expect(screen.getByLabelText(/durée/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/durée/i)).toHaveValue(null);
    
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('');
    
    expect(screen.getByRole('button', { name: /créer la vidéo/i })).toBeInTheDocument();
  });

  /**
   * Test 2: Validation des champs obligatoires
   * Vérifie qu'un message d'erreur s'affiche si un champ est vide
   */
  test('devrait afficher une erreur si un champ obligatoire est vide', async () => {
    render(<VideoCreateForm user={mockUser} />);

    const submitButton = screen.getByRole('button', { name: /créer la vidéo/i });
    
    // Soumettre le formulaire sans remplir les champs
    fireEvent.submit(submitButton.closest('form'));

    await waitFor(() => {
      expect(screen.getByText('Tous les champs sont obligatoires')).toBeInTheDocument();
    });
  });

  /**
   * Test 3: Validation lorsque tous les champs sont remplis
   * Vérifie que la soumission fonctionne avec des données valides et complètes
   */
  test('devrait valider correctement quand tous les champs sont remplis', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ id: 1 }))
      })
    );

    const { container } = render(<VideoCreateForm user={mockUser} />);

    // Remplir tous les champs correctement
    fireEvent.change(screen.getByLabelText(/titre/i), {
      target: { value: 'Test Vidéo' }
    });
    fireEvent.change(screen.getByLabelText(/url/i), {
      target: { value: 'https://example.com/video.mp4' }
    });
    fireEvent.change(getDescriptionTextarea(container), {
      target: { value: 'Description test' }
    });
    fireEvent.change(screen.getByLabelText(/durée/i), {
      target: { value: '25' }
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '1' }
    });

    fireEvent.submit(screen.getByRole('button', { name: /créer la vidéo/i }).closest('form'));

    await waitFor(() => {
      expect(screen.getByText(/vidéo créée avec succès/i)).toBeInTheDocument();
    });
    
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  /**
   * Test 4: Création réussie d'une vidéo avec données valides
   * Vérifie l'appel API et l'affichage du message de succès
   */
  test('devrait créer une vidéo avec succès et afficher un message de confirmation', async () => {
    // Mock de fetch pour simuler une réponse réussie
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({
          id: 1,
          title: 'Introduction à Spring Boot',
          url: 'https://example.com/video.mp4',
          description: 'Tutoriel complet',
          duration: 30,
          serviceId: 1
        }))
      })
    );

    const { container } = render(<VideoCreateForm user={mockUser} />);

    // Remplir tous les champs avec des données valides
    fireEvent.change(screen.getByLabelText(/titre/i), {
      target: { value: 'Introduction à Spring Boot' }
    });
    fireEvent.change(screen.getByLabelText(/url/i), {
      target: { value: 'https://example.com/video.mp4' }
    });
    fireEvent.change(getDescriptionTextarea(container), {
      target: { value: 'Tutoriel complet' }
    });
    fireEvent.change(screen.getByLabelText(/durée/i), {
      target: { value: '30' }
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '1' }
    });

    // Soumettre le formulaire
    fireEvent.submit(screen.getByRole('button', { name: /créer la vidéo/i }).closest('form'));

    // Vérifier que l'API a été appelée avec les bonnes données
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8081/public/v1/videos/',
        expect.objectContaining({
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: 'Introduction à Spring Boot',
            url: 'https://example.com/video.mp4',
            description: 'Tutoriel complet',
            duration: 30,
            author: 'mentor@test.com',
            serviceId: 1,
            utilisateurId: 1
          })
        })
      );
    });

    // Vérifier l'affichage du message de succès
    await waitFor(() => {
      expect(screen.getByText(/vidéo créée avec succès/i)).toBeInTheDocument();
    });

    // Vérifier que les champs sont réinitialisés
    expect(screen.getByLabelText(/titre/i)).toHaveValue('');
    expect(screen.getByLabelText(/url/i)).toHaveValue('');
    expect(getDescriptionTextarea(container)).toHaveValue('');
  });

  /**
   * Test 5: Gestion des erreurs réseau
   * Vérifie l'affichage d'un message d'erreur en cas d'échec de l'API
   */
  test('devrait afficher un message d\'erreur si l\'API retourne une erreur', async () => {
    // Mock de fetch pour simuler une erreur
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve('Erreur serveur: Service non trouvé')
      })
    );

    const { container } = render(<VideoCreateForm user={mockUser} />);

    // Remplir le formulaire
    fireEvent.change(screen.getByLabelText(/titre/i), {
      target: { value: 'Test Vidéo' }
    });
    fireEvent.change(screen.getByLabelText(/url/i), {
      target: { value: 'https://example.com/video.mp4' }
    });
    fireEvent.change(getDescriptionTextarea(container), {
      target: { value: 'Description' }
    });
    fireEvent.change(screen.getByLabelText(/durée/i), {
      target: { value: '20' }
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '1' }
    });

    fireEvent.submit(screen.getByRole('button', { name: /créer la vidéo/i }).closest('form'));

    await waitFor(() => {
      expect(screen.getByText(/erreur lors de la création de la vidéo/i))
        .toBeInTheDocument();
    });
  });

  /**
   * Test 6: Trimming des espaces dans les champs texte
   * Vérifie que les espaces en début/fin sont supprimés
   */
  test('devrait supprimer les espaces au début et à la fin des champs texte', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ id: 1, title: 'Test' }))
      })
    );

    const { container } = render(<VideoCreateForm user={mockUser} />);

    // Remplir avec des espaces
    fireEvent.change(screen.getByLabelText(/titre/i), {
      target: { value: '  Introduction à Spring Boot  ' }
    });
    fireEvent.change(screen.getByLabelText(/url/i), {
      target: { value: '  https://example.com/video.mp4  ' }
    });
    fireEvent.change(getDescriptionTextarea(container), {
      target: { value: '  Tutoriel complet  ' }
    });
    fireEvent.change(screen.getByLabelText(/durée/i), {
      target: { value: '30' }
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '1' }
    });

    fireEvent.submit(screen.getByRole('button', { name: /créer la vidéo/i }).closest('form'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('"title":"Introduction à Spring Boot"')
        })
      );
    });
  });

  /**
   * Test 7: Affichage de la liste des services
   * Vérifie que tous les services sont disponibles dans le select
   */
  test('devrait afficher tous les services disponibles dans le select', () => {
    render(<VideoCreateForm user={mockUser} />);

    const selectElement = screen.getByRole('combobox');
    const options = selectElement.querySelectorAll('option');

    // 5 options au total (1 option par défaut + 4 services)
    expect(options).toHaveLength(5);
    expect(options[0]).toHaveTextContent('--Choisir un service--');
    expect(options[1]).toHaveTextContent('Formation');
    expect(options[2]).toHaveTextContent('Reconversion');
    expect(options[3]).toHaveTextContent('Orientation');
    expect(options[4]).toHaveTextContent('Insertion Professionnelle');
  });

  /**
   * Test 8: Interaction utilisateur complète
   * Simule une interaction utilisateur réelle avec fireEvent
   */
  test('devrait gérer une interaction utilisateur complète', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ id: 1 }))
      })
    );

    const { container } = render(<VideoCreateForm user={mockUser} />);

    // Simuler la saisie utilisateur
    fireEvent.change(screen.getByLabelText(/titre/i), {
      target: { value: 'Ma nouvelle vidéo' }
    });
    fireEvent.change(screen.getByLabelText(/url/i), {
      target: { value: 'https://example.com/video.mp4' }
    });
    fireEvent.change(getDescriptionTextarea(container), {
      target: { value: 'Description détaillée' }
    });
    fireEvent.change(screen.getByLabelText(/durée/i), {
      target: { value: '45' }
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '2' }
    });

    // Soumettre le formulaire
    fireEvent.submit(screen.getByRole('button', { name: /créer la vidéo/i }).closest('form'));

    // Vérifier le succès
    await waitFor(() => {
      expect(screen.getByText(/vidéo créée avec succès/i)).toBeInTheDocument();
    });
  });
});
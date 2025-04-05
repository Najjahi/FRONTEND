import { Check, Delete } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [taskName, setTaskName] = useState<string>('');
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);

  // Fonction pour récupérer toutes les tâches
  const handleFetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      if (response) {
        setTasks(response);
      } else {
        console.error('La réponse est vide');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
    }
  };

  // Fonction pour sauvegarder ou mettre à jour une tâche
  const handleSave = async () => {
    try {
      if (taskName.trim() !== '') {
        const taskData = { name: taskName };
        let response;
        
        if (editingTaskId) {
          // Mise à jour d'une tâche existante
          console.log('Mise à jour de la tâche avec ID:', editingTaskId, 'et nom:', taskName);
          response = await api.put(`/tasks/${editingTaskId}`, taskData); // Envoi de la requête PUT
        } else {
          // Création d'une nouvelle tâche
          response = await api.post('/tasks', taskData);
        }

        if (response) {
          await handleFetchTasks(); // Rafraîchir la liste des tâches après la sauvegarde
          setEditingTaskId(null); // Réinitialiser l'ID de la tâche
          setTaskName(''); // Réinitialiser le champ de texte
          setIsAddingTask(false); // Désactiver le mode d'ajout
        } else {
          console.error('La réponse est vide ou invalide lors de la sauvegarde');
        }
      } else {
        console.error('Le nom de la tâche ne peut pas être vide');
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la tâche:', error);
    }
  };

  // Fonction pour supprimer une tâche
  const handleDelete = async (id: number) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      if (response) {
        await handleFetchTasks(); // Rafraîchir la liste des tâches après la suppression
      } else {
        console.error('La réponse est vide ou invalide lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
    }
  };

  // Fonction pour éditer une tâche
  const handleEdit = (task: Task) => {
    setEditingTaskId(task.id); // Mettre l'ID de la tâche en mode édition
    setTaskName(task.name); // Remplir le champ de texte avec le nom de la tâche
  };

  // Vérifier si la tâche a été modifiée pour désactiver le bouton "Save"
  const isSaveDisabled = () => {
    const taskToUpdate = tasks.find((task) => task.id === editingTaskId);
    return taskName === taskToUpdate?.name || taskName.trim() === '';
  };

  // Activer le mode ajout d'une nouvelle tâche
  const handleAddTaskClick = () => {
    setIsAddingTask(true);
    setTaskName('');
    setEditingTaskId(null);
  };

  useEffect(() => {
    (async () => {
      await handleFetchTasks();
    })();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {
          tasks.map((task) => (
            <Box key={task.id} display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%">
              <TextField
                size="small"
                value={editingTaskId === task.id ? taskName : task.name}
                onChange={(e) => setTaskName(e.target.value)}
                fullWidth
                sx={{ maxWidth: 350 }}
              />
              <Box>
                {editingTaskId === task.id ? (
                  <IconButton
                    color="success"
                    onClick={handleSave}
                    disabled={isSaveDisabled()}
                  >
                    <Check />
                  </IconButton>
                ) : (
                  <IconButton
                    color="success"
                    onClick={() => handleEdit(task)}
                  >
                    <Check />
                  </IconButton>
                )}
                <IconButton
                  color="error"
                  onClick={() => handleDelete(task.id)}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          ))
        }

        {isAddingTask && (
          <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={1}>
            <TextField
              size="small"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              label="Nouvelle tâche"
              fullWidth
              sx={{ maxWidth: 350 }}
            />
            <IconButton color="success" onClick={handleSave} disabled={taskName.trim() === ''}>
              <Check />
            </IconButton>
          </Box>
        )}

        {!isAddingTask && (
          <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
            <Button variant="outlined" onClick={handleAddTaskClick}>
              Ajouter une tâche
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default TodoPage;

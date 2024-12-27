import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function ContactNotesEditModal({ open, onClose, note, onSave }) {
  const [editedNote, setEditedNote] = useState(note);

  const handleSave = () => {
    onSave(editedNote); // Llame a la función onSave con la nota editada
    onClose(); // Cierra el cuadro de diálogo de edición.
  };

  return (
    <Dialog open={open} onClose={onClose} 
    maxWidth="xs"
    fullWidth
    >
      <DialogTitle>Editar nota</DialogTitle>
      <DialogContent>
        <TextField
          label="Edit Note"
          fullWidth
          multiline
          rows={4}
          value={note}
          onChange={(e) => setEditedNote(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

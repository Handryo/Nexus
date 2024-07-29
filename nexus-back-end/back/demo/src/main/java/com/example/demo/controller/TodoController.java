package com.example.demo.controller;

import com.example.demo.model.Todo;
import com.example.demo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")  // Define o prefixo da URL para todos os endpoints deste controlador
public class TodoController {

    @Autowired
    private TodoService todoService;  // Injeta o serviço de gerenciamento de tarefas

    @GetMapping
    public List<Todo> getAllTodos() {
        // Obtém a lista de todas as tarefas
        return todoService.getAllTodos();
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
        // Cria uma nova tarefa e retorna a tarefa criada com status HTTP 200 OK
        Todo createdTodo = todoService.createTodo(todo);
        return ResponseEntity.ok(createdTodo);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Todo> updateTodoStatus(@PathVariable Long id) {
        // Atualiza o status da tarefa com o ID especificado e retorna a tarefa atualizada com status HTTP 200 OK
        Todo updatedTodo = todoService.updateTodoStatus(id);
        return ResponseEntity.ok(updatedTodo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        // Exclui a tarefa com o ID especificado e retorna status HTTP 204 No Content
        todoService.deleteTodo(id);
        return ResponseEntity.noContent().build();
    }
}

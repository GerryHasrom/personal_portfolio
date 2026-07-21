mod commands; 

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn process_command(command: &str) -> String {
    let input = command.trim().to_lowercase();
    if let Some(response) = commands::get_response(&input) {
        response
    } else {
        format!("Unknown command: {}. Type 'help' my friends..", input)
    }
}
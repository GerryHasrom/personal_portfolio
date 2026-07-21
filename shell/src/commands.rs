pub fn get_response(command: &str) -> Option<String> {
    match command {
        "about" => Some("Hi! I'm Gerry Hasrom, fresh grad passionate about systems programming and low-level tech.".to_string()),
        "contact" => Some("Email: gerryhasrom25@gmail.com\nGitHub: https://github.com/GerryHasrom".to_string()),
        "delete" => Some("CLEAR_TERMINAL".to_string()),
        "education" => Some("S.Kom. in informatics, Mulawarman University (2026)".to_string()),
        "email" => Some("gerryhasrom25@email.com".to_string()),
        "go" => Some("REDIRECT:landing.html".to_string()),
        "hobbies" => Some("No day without listening Music (pop, classical, nightcore), coding, self taught, gaming (mobile legends, teamfight tactics, clash royale, genshin impact), surfing the internet, sometimes reading journals or articles related to cybersecurity, web aggregator, learning real estate, self taught.".to_string()),
        "help" => Some(help_text()),
        "me" => Some("Hello my friends, I'm Gerry Hasrom, a recent informatics graduate from Mulawarman University interested in technology and business. I enjoy coding in technology, focusing on web-based and AI. As for business, I'm interested in real estate. Real estate is truly amazing.".to_string()),
        "parents" => Some("Mr. Hasiholan Sirait & Mrs. Romida Marpaung, and abbreviated to Hasrom, my name".to_string()),
        "projects" => Some("1. terminal-portfolio (Rust + Wasm)\n2. Mini OS Kernel (Rust)".to_string()),
        "skills" => Some("Experienced in building web applications with HTML, CSS, JavaScript, and Python. Exploring Systems Programming with Rust, C, and Linux".to_string()),
        "status" => Some("🟢 Available for hire! Very much so..".to_string()),
        _ => None,
    }
}

fn help_text() -> String {
    let mut cmds = vec![
        "about", "contact", "delete", "education", "email",
        "go", "hobbies", "help", "me", "parents",
        "projects", "skills", "status",
    ];
    cmds.sort();
    let mut result = String::new();
    for chunk in cmds.chunks(5) {
        for (i, cmd) in chunk.iter().enumerate() {
            if i > 0 { result.push_str("  "); } 
            result.push_str(&format!("{:<10}", cmd));
        }
        result.push('\n');
    }
    result.trim_end().to_string()
}
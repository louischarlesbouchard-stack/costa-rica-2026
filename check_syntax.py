
import sys

def check_balance(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    
    for i, char in enumerate(content):
        if char in '({[':
            stack.append((char, i + 1))
        elif char in ')}]':
            if not stack:
                print(f"Error: Unmatched '{char}' at line {get_line_number(content, i)}")
                return
            
            last, idx = stack.pop()
            if pairs[char] != last:
                print(f"Error: Mismatched '{char}' at line {get_line_number(content, i)}. Expected closing for '{last}' from line {get_line_number(content, idx-1)}")
                return

    if stack:
        last, idx = stack[-1]
        print(f"Error: Unclosed '{last}' at line {get_line_number(content, idx-1)}")

def get_line_number(content, idx):
    return content[:idx].count('\n') + 1

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python check_syntax.py <file>")
    else:
        check_balance(sys.argv[1])

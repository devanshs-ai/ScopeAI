import re
import sys

input_file = sys.argv[1]
output_file = sys.argv[2]
function_name = sys.argv[3]

with open(input_file, "r", encoding="utf-8") as f:
    html = f.read()

# Extract body class
body_class = ""
body_class_match = re.search(r'<body[^>]*class="([^"]*)"', html, re.IGNORECASE)
if body_class_match:
    body_class = body_class_match.group(1)

# Extract body content
body_match = re.search(r"<body[^>]*>\s*(.*?)\s*</body>", html, re.DOTALL | re.IGNORECASE)
if body_match:
    body = body_match.group(1)
    # Check if there's a div with id="root", if so extract its content
    root_match = re.search(r'<div id="root"[^>]*>\s*(.*?)\s*</div>', body, re.DOTALL | re.IGNORECASE)
    if root_match:
        body = root_match.group(1)
else:
    body = html

jsx = body

# Remove scripts
jsx = re.sub(r"<script.*?>.*?</script>", "", jsx, flags=re.DOTALL | re.IGNORECASE)

# Basic JSX replacements
jsx = jsx.replace('class="', 'className="')
jsx = jsx.replace('for="', 'htmlFor="')
jsx = jsx.replace('tabindex="', 'tabIndex="')
jsx = jsx.replace('maxlength="', 'maxLength="')
jsx = jsx.replace('autocomplete="', 'autoComplete="')
jsx = jsx.replace('onclick="', 'onClick="')
jsx = jsx.replace('onsubmit="', 'onSubmit="')
jsx = jsx.replace('onchange="', 'onChange="')

# Wrap SVG attribute names
for attr in ['fill-rule', 'clip-rule', 'stroke-linecap', 'stroke-linejoin', 'stroke-width', 'clip-path']:
    cc_attr = ''.join(word.title() if i else word for i, word in enumerate(attr.split('-')))
    jsx = jsx.replace(f'{attr}="', f'{cc_attr}="')

# Fix self closing tags
jsx = re.sub(r'<(img|input|br|hr)([^>]*?)(?<!/)>', r'<\1\2 />', jsx)

# Fix comments
jsx = re.sub(r"<!--(.*?)-->", r"{/* \1 */}", jsx, flags=re.DOTALL)

def style_replacer(match):
    style_str = match.group(1)
    # Parse rules
    rules = []
    for rule in style_str.split(';'):
        if ':' in rule:
            k, v = rule.split(':', 1)
            k = k.strip()
            v = v.strip()
            # camelCase the key
            k = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)
            # handle background-image urls with quotes safely
            v = v.replace("'", "\\'")
            rules.append(f"{k}: '{v}'")
    return "style={{" + ", ".join(rules) + "}}"

jsx = re.sub(r'style="([^"]*)"', style_replacer, jsx)

# Filter out the existing grain overlay from the original html if we're adding it manually via wrapper, or just keep the one we add.
jsx = re.sub(r'<div className="grain-overlay"></div>', '', jsx)

final_component = f"""import {{ useNavigate }} from 'react-router-dom';

export default function {function_name}() {{
  const navigate = useNavigate();
  return (
    <div className="{{`dark ${{'{body_class}'}} w-full min-h-screen relative`}}">
      {{/* Film grain overlay */}}
      <div 
        className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03] mix-blend-overlay"
        style={{{{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\\"0 0 200 200\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noiseFilter\\"%3E%3CfeTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.8\\" numOctaves=\\"3\\" stitchTiles=\\"stitch\\"/%3E%3C/filter%3E%3Crect width=\\"100%25\\" height=\\"100%25\\" filter=\\"url(%23noiseFilter)\\"/%3E%3C/svg%3E')" }}}}
      ></div>
      {jsx}
    </div>
  );
}}
"""

with open(output_file, "w", encoding="utf-8") as f:
    f.write(final_component)

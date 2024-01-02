Search.setIndex({"docnames": ["combinatorics/catalan", "combinatorics/combinations-and-bijective-proofs", "combinatorics/counting-functions", "combinatorics/enumerative", "combinatorics/inclusion-exclusion", "combinatorics/integer-partitions", "combinatorics/stars-bars", "combinatorics/twelvefold", "graph-theory/graph-theory", "intro"], "filenames": ["combinatorics/catalan.md", "combinatorics/combinations-and-bijective-proofs.md", "combinatorics/counting-functions.md", "combinatorics/enumerative.md", "combinatorics/inclusion-exclusion.md", "combinatorics/integer-partitions.md", "combinatorics/stars-bars.md", "combinatorics/twelvefold.md", "graph-theory/graph-theory.md", "intro.md"], "titles": ["The Catalan Numbers", "Combinations and Bijective Proofs", "Counting Functions", "Enumerative Combinatorics", "Inclusion-Exclusion and Counting Partitions", "Integer Partitions", "Stars and Bars", "The Twelvefold Way", "Graph Theory", "Some Mathematics in Dyalog APL"], "terms": {"what": [0, 1, 2, 5, 6], "ar": [0, 1, 2, 3, 4, 5, 6], "thei": [0, 1, 2, 4, 5, 6], "dyck": 0, "path": 0, "simpl": [0, 3], "exampl": [0, 1, 2, 3, 4, 5, 6], "recurr": 0, "proof": 0, "c": [0, 1, 4], "n": [0, 1, 2, 3, 4, 5, 6], "1": [0, 1, 2, 3, 4, 5, 6, 7], "0": [0, 1, 2, 3, 4, 5], "cs": 0, "close": [0, 5], "form": [0, 1, 4, 5, 6], "2": [0, 1, 2, 3, 4, 5, 7], "more": [0, 1, 2, 3, 4, 5, 7], "mention": 0, "stanlei": [0, 7], "book": [0, 3], "io": [1, 2, 3, 4, 6], "In": [1, 2, 3, 4], "thi": [1, 2, 3, 4, 5, 6], "section": [1, 2, 4, 5, 6], "we": [1, 2, 3, 4, 5, 6, 7], "re": [1, 2, 3, 4, 5, 6, 7], "go": [1, 2, 3, 4, 5, 6, 7], "encount": 1, "one": [1, 2, 3, 4, 5, 6, 7], "most": [1, 2, 5, 7], "basic": 1, "us": [1, 2, 3, 4, 5, 6], "concept": 1, "combinator": 1, "A": [1, 3, 4, 5], "select": [1, 2, 3], "distinct": [1, 5], "element": [1, 2, 3, 4], "from": [1, 2, 3, 4, 7], "set": [1, 2, 3, 5], "without": [1, 4], "repetit": 1, "where": [1, 2, 4, 5, 6], "don": [1, 2, 4, 5], "t": [1, 2, 4, 5], "care": [1, 2, 4, 5], "about": [1, 2, 4, 5], "order": [1, 2, 4, 5], "pick": [1, 3, 4], "For": [1, 2, 3, 4, 5, 6], "given": [1, 2, 3, 4], "3": [1, 2, 3, 4, 5, 7], "It": [1, 2, 5, 6], "differ": [1, 2, 3, 4, 5, 6], "same": [1, 2, 4, 5, 6], "sinc": [1, 2, 3, 4, 5, 6], "k": [1, 2, 3, 4, 5, 6], "exactli": [1, 2, 3, 5], "There": [1, 3, 4, 6], "10": [1, 4, 5], "our": [1, 2, 3, 4, 5, 6], "probabl": 1, "clear": 1, "If": [1, 2, 3, 4, 5], "have": [1, 2, 3, 4, 5, 6, 7], "how": [1, 2, 4, 5, 6], "mani": [1, 2, 3, 4, 5, 6], "veri": [1, 4, 6], "similar": [1, 4], "question": [1, 6], "ve": [1, 2, 3, 5, 6], "alreadi": [1, 4, 7], "answer": [1, 6], "seen": [1, 2, 5, 7], "permut": [1, 2, 3, 4, 7], "an": [1, 2, 3, 4], "so": [1, 2, 3, 4, 5, 6], "good": 1, "start": [1, 2, 3, 4, 6], "point": [1, 3], "than": [1, 2, 3, 4, 5], "matter": [1, 2], "item": [1, 3], "60": 1, "which": [1, 2, 3, 4, 5], "can": [1, 2, 3, 4, 5, 6, 7], "group": [1, 3, 4], "equival": [1, 2, 5], "each": [1, 2, 4, 5, 6, 7], "see": [1, 2, 3, 4], "6": [1, 3, 4, 5], "gener": [1, 2, 3, 4, 5, 7], "formula": [1, 4], "count": [1, 5, 6], "overcount": [1, 4], "factor": [1, 4], "lead": [1, 5], "number": [1, 2, 4, 5, 6, 7, 9], "By": [1, 4], "divid": [1, 3, 4], "undo": 1, "partial": [1, 3, 7], "along": [1, 4, 5], "factori": [1, 3], "quantiti": [1, 3, 5], "too": 1, "get": [1, 2, 3, 5], "own": [1, 3, 6], "name": [1, 3], "coeffici": [1, 4, 6], "ll": [1, 2, 3, 5], "come": [1, 6], "later": [1, 2], "take": [1, 2, 3, 4, 5], "up": [1, 2, 4, 5], "dyadic": 1, "5": [1, 3, 4, 5], "you": [1, 2, 3, 4, 5], "might": [1, 2, 3], "like": [1, 2, 4, 5], "read": 1, "note": [1, 2, 4, 5, 6], "domain": [1, 2], "error": 1, "when": [1, 2, 4, 5], "becaus": [1, 5], "doesn": [1, 2, 5], "make": [1, 2, 6], "ani": [1, 2, 4, 5, 7], "sens": [1, 2], "align": 1, "intuit": 1, "slightli": [1, 3, 5, 6], "toler": 1, "evalu": 1, "rather": [1, 4], "ing": 1, "indic": [1, 5, 6], "wai": [1, 2, 3, 4, 5, 6, 9], "try": [1, 4], "thing": [1, 2], "tradit": [1, 2, 3, 4], "mathemat": [1, 2, 3, 4], "notat": [1, 2, 3, 4], "written": [1, 3, 4], "binom": 1, "begin": [1, 5], "case": [1, 3, 5], "frac": 1, "le": 1, "end": [1, 4, 6], "usual": [1, 2], "choos": [1, 2], "here": [1, 2, 4, 5], "interest": [1, 2, 5], "alwai": [1, 6], "To": [1, 3, 4, 5, 6], "why": 1, "let": [1, 2, 3, 4, 5, 6], "view": 1, "anoth": [1, 3, 4, 6], "perspect": 1, "trusti": 1, "fruit": [1, 2], "mark": 1, "those": [1, 4], "rest": [1, 2, 6, 7], "nice": [1, 3, 5, 6], "represent": [1, 2, 5, 6], "put": [1, 2, 3, 6], "choic": [1, 3], "revers": 1, "result": [1, 3, 4], "give": [1, 2, 4, 5, 6], "new": [1, 5], "look": [1, 2, 3, 4, 5], "out": [1, 2, 3, 4, 5, 6], "sequenc": 1, "turn": [1, 2, 5, 6], "ones": 1, "equal": [1, 4, 5], "other": [1, 2, 4, 6, 7], "word": [1, 2], "discard": 1, "must": [1, 2, 4, 5, 6], "studi": [1, 3], "detail": [1, 2], "help": [1, 2, 6], "its": [1, 3, 4, 5], "function": [1, 4, 5, 6, 7], "tabl": [1, 7], "7": [1, 3, 4, 5], "4": [1, 2, 3, 4, 5], "15": [1, 4], "20": 1, "21": [1, 4], "35": 1, "trip": 1, "defin": [1, 3], "all": [1, 2, 3, 4, 5, 6], "non": [1, 4, 5], "neg": 1, "integ": 1, "includ": [1, 2, 5], "mean": [1, 2, 3, 4, 5], "valu": [1, 4], "p": [1, 2, 4, 5], "work": [1, 2, 5], "call": [1, 2, 3, 5], "ha": [1, 2, 3, 5, 6], "been": [1, 2], "centuri": 1, "pattern": [1, 4], "first": [1, 3, 4, 5, 6], "easili": 1, "properti": [1, 5], "just": [1, 2, 3, 4, 5, 6], "prove": [1, 4, 5], "fact": 1, "row": [1, 4, 5], "symmetr": [1, 5], "ignor": 1, "notic": [1, 2], "sum": [1, 4, 5], "directli": 1, "abov": [1, 2, 4], "befor": [1, 4, 5], "th": [1, 4], "two": [1, 2, 4, 6], "could": [1, 3, 4, 5, 6], "also": [1, 2, 3, 4, 5], "trangl": 1, "repeatedli": 1, "adjac": 1, "would": [1, 2, 3, 4], "matrix": [1, 5], "saw": [1, 2, 5, 6], "state": 1, "formal": [1, 2], "sai": [1, 2, 3, 4], "algebra": 1, "long": 1, "unenlighten": 1, "find": [1, 4, 5], "footnot": 1, "instead": [1, 2, 5, 6], "valid": [1, 2], "talk": 1, "describ": 1, "option": [1, 2], "either": [1, 7], "remain": [1, 3, 6], "total": [1, 3, 4, 6], "therefor": [1, 4, 5], "kind": [1, 3, 4], "show": [1, 2], "express": 1, "throughout": 1, "do": [1, 3, 4, 5, 7], "better": 1, "feel": 1, "process": 1, "were": [1, 3], "plai": 1, "around": 1, "aris": 1, "8": [1, 5], "16": [1, 4], "32": 1, "64": [1, 3], "128": 1, "power": 1, "specif": [1, 2, 4, 6], "write": [1, 4, 5], "pervas": 1, "friend": 1, "b": [1, 4], "again": [1, 2, 5], "alegebra": 1, "much": [1, 2, 3], "insight": [1, 3], "plu": 1, "until": [1, 2, 3], "size": [1, 4], "both": [1, 2, 4, 6, 7], "now": [1, 2, 3, 4, 6], "readi": [1, 4], "namesak": 1, "expans": 1, "some": [1, 2, 3, 4, 5, 6], "small": 1, "mathbf": 1, "ab": [1, 5], "2b": 1, "3b": 1, "4b": 1, "vdot": 1, "ring": 1, "bell": [1, 4], "your": 1, "head": 1, "coincid": 1, "multipli": 1, "distribut": [1, 6], "law": 1, "creat": 1, "sub": 1, "everyth": 1, "eventu": 1, "being": [1, 2, 4], "made": 1, "string": [1, 2, 6], "togeth": [1, 4], "possibl": [1, 2, 3, 4, 7], "aa": 1, "ba": 1, "bb": 1, "aaa": 1, "aab": 1, "aba": 1, "abb": 1, "baa": 1, "bab": 1, "bba": 1, "bbb": 1, "3a": 1, "3ab": 1, "think": [1, 2, 5], "relabel": 1, "binari": [1, 2], "replac": 1, "sum_": [1, 4], "kb": 1, "reason": 1, "behind": 1, "somewhat": 1, "easier": 1, "grasp": 1, "cours": [1, 3, 4], "apl": [1, 3, 7], "term": [1, 3, 5], "16807": 1, "essenti": 1, "split": 1, "partit": 1, "generalis": [1, 3], "k_1": 1, "k_2": 1, "ldot": [1, 4], "k_r": 1, "whose": [1, 2], "cdot": [1, 3], "multinomi": 1, "specialis": 1, "coeffic": 1, "familiar": [1, 2], "unord": 1, "relat": [1, 2], "featur": 1, "although": 1, "after": 1, "french": 1, "mathematician": 1, "blais": 1, "wa": 1, "discov": 1, "him": 1, "assum": 2, "notion": 2, "inject": 2, "surject": [2, 5, 6], "biject": [2, 5], "far": [2, 5], "problem": [2, 3, 4, 5, 6, 7], "combin": 2, "s": [2, 3, 4, 5, 6], "light": 2, "toward": 2, "understand": [2, 6], "over": [2, 3, 4], "chapter": [2, 3], "previou": [2, 4, 5, 6], "repres": [2, 4, 5, 6], "suppos": [2, 6], "charact": 2, "correspond": [2, 5], "wherev": 2, "appear": [2, 4], "leav": [2, 6], "empti": [2, 3, 4], "place": [2, 3, 4, 5, 6, 7], "origin": [2, 4], "The": [2, 3, 5, 9], "import": 2, "analog": [2, 4, 6], "label": [2, 4, 5, 6, 7], "while": [2, 6], "unlabel": [2, 4, 5, 6], "indistinguish": [2, 6], "howev": 2, "doe": 2, "dictat": 2, "chosen": 2, "setup": 2, "altern": 2, "statement": 2, "isol": 2, "particularli": 2, "enlighten": 2, "tweak": 2, "paramet": 2, "three": [2, 4, 6, 7], "chang": 2, "whether": 2, "allow": 2, "whole": [2, 3], "famili": 2, "categoris": 2, "them": [2, 3, 4, 5], "next": [2, 5], "part": [2, 5], "effect": 2, "goe": 2, "With": [2, 6], "longer": [2, 4, 5], "index": 2, "vari": 2, "control": 2, "affect": 2, "requir": 2, "consid": [2, 3, 4, 5, 6], "involv": 2, "assign": 2, "placement": [2, 5], "monad": [2, 3], "input": [2, 4], "return": [2, 3, 4], "output": 2, "quit": 2, "fun": 2, "forget": 2, "itself": [2, 5], "f": [2, 4], "type": [2, 4], "fewer": 2, "onli": [2, 3, 4, 5, 6], "isn": 2, "valid3permut": 2, "invalid3permut": 2, "invalid": 2, "sent": 2, "realli": 2, "i": [2, 4], "e": [2, 4], "send": [2, 4], "least": [2, 4, 5, 6, 7], "need": [2, 4], "potenti": 2, "chanc": 2, "otherwis": 2, "wouldn": 2, "enough": [2, 3, 4], "translat": 2, "model": 2, "follow": [2, 4], "combination1": 2, "combination2": 2, "importantli": 2, "vector": [2, 4], "x": [2, 4], "remaind": [2, 3], "time": [2, 3, 4, 5, 6], "want": [2, 3, 4, 6], "distinguish": [2, 6], "between": [2, 4, 5], "should": 2, "restrict": [2, 3, 4, 5], "summaris": 2, "below": [2, 5], "rang": 2, "At": [2, 3], "per": 2, "length": 2, "essenc": 3, "Of": [3, 4], "hopefulli": 3, "know": [3, 4, 5], "techniqu": [3, 6], "taught": 3, "child": 3, "peopl": [3, 6], "alic": 3, "bob": 3, "charli": 3, "ask": 3, "favourit": 3, "colour": 3, "red": 3, "green": 3, "blue": 3, "yellow": 3, "hypothet": 3, "gang": 3, "well": 3, "hold": 3, "bookshelf": 3, "fill": [3, 4, 6, 7], "arrang": [3, 4, 6], "shelf": 3, "took": 3, "off": 3, "back": [3, 4], "second": [3, 4, 5], "24": 3, "rearrang": 3, "Such": 3, "calcul": [3, 4], "built": 3, "product": 3, "imagin": [3, 5], "noth": 3, "postfix": 3, "scenario": [3, 5], "still": [3, 4], "onto": 3, "larger": 3, "collect": 3, "final": 3, "840": 3, "lot": [3, 5], "chop": 3, "trail": 3, "last": [3, 5], "tell": 3, "These": [3, 4, 5, 6], "concern": 3, "onc": [3, 4], "cover": [3, 5], "ground": 3, "unifi": 3, "framework": 3, "sort": 3, "twelvefold": [3, 9], "algorithm": [3, 5, 7], "finit": 3, "structur": 3, "topic": 4, "build": 4, "tool": 4, "union": 4, "easi": [4, 6], "add": [4, 5], "rel": 4, "intersect": 4, "twice": 4, "individu": 4, "minu": 4, "appli": 4, "logic": 4, "pairwis": 4, "subtract": 4, "extra": [4, 5], "uncount": 4, "emerg": 4, "substract": 4, "tripl": 4, "wise": 4, "quadrupl": 4, "through": 4, "subset": 4, "even": [4, 5], "els": 4, "left": 4, "bigcup_": 4, "na_i": 4, "right": [4, 5], "emptyset": 4, "ne": 4, "j": 4, "subseteq": 4, "bigcap_": 4, "a_j": 4, "action": 4, "abc": 4, "cdef": 4, "defg": 4, "fg": 4, "abcdefg": 4, "true": 4, "contain": 4, "odd": [4, 5], "everi": 4, "m": 4, "binomi": [4, 6], "theorem": 4, "stai": 4, "posit": [4, 5, 6], "fix": 4, "object": 4, "free": 4, "move": 4, "inform": [4, 7], "nonempti": 4, "expand": 4, "cancel": 4, "absorb": 4, "ad": 4, "tacit": 4, "nderang": 4, "http": 4, "oei": 4, "org": 4, "a000166": 4, "9": [4, 5], "44": 4, "265": 4, "1854": 4, "14833": 4, "133496": 4, "1334961": 4, "deriv": 4, "actual": 4, "taylor": 4, "polynomi": 4, "ball": [4, 5, 6, 7], "box": [4, 5, 6, 7], "method": 4, "discuss": 4, "That": [4, 5], "miss": 4, "cannot": 4, "likewis": 4, "did": 4, "whirl": 4, "surj": 4, "14": [4, 5], "solv": 4, "piec": 4, "within": 4, "stirl": 4, "25": 4, "often": 4, "brace": 4, "triangl": 4, "31": 4, "90": 4, "65": 4, "63": 4, "301": 4, "350": 4, "140": 4, "a000110": 4, "52": 4, "203": 4, "877": 4, "interpret": [4, 5, 6], "prefer": 4, "powerset": 4, "cycl": 4, "young": 5, "diagram": 5, "conjug": 5, "self": 5, "hook": 5, "tableaux": 5, "variat": 5, "tie": 5, "neat": 5, "packag": 5, "ourselv": 5, "confus": 5, "map": [5, 7], "third": 5, "star": 5, "bar": 5, "decreas": 5, "consist": 5, "remov": [5, 6], "greater": 5, "won": 5, "enumer": [5, 7], "confirm": 5, "42": 5, "sever": 6, "variant": 6, "few": 6, "ident": 6, "cooki": 6, "among": 6, "roll": 6, "dice": 6, "face": 6, "degre": 6, "monomi": 6, "variabl": [6, 7], "mid": 6, "Then": 6, "juxtapos": 6, "But": 6, "redund": 6, "middl": 6, "pair": 6, "boundari": 6, "superflu": 6, "simplifi": 6, "except": 6, "rephras": 6, "concret": 6, "space": 6, "similarli": 6, "down": [5, 6], "solut": 6, "inde": 6, "modifi": 6, "ensur": 6, "had": 6, "Or": 6, "modif": 6, "reserv": 6, "normal": 6, "receiv": 6, "conceptu": 7, "arrai": [5, 7], "richard": 7, "gui": 7, "explor": 7, "sudlei": 7, "nars2000": 7, "stuff": 7, "taocp4a": 7, "imper": 7, "recurs": 7, "aplcart": 7, "enum": 9, "catalan": 9, "sadli": 5, "known": 5, "implement": 5, "visualis": 5, "tableau": 5, "ferrer": 5, "suggest": 5, "transform": 5, "perform": 5, "instanc": 5, "transpos": 5, "q": 5, "link": 5, "articl": 5, "absenc": 5, "nest": 5, "rag": 5, "diagon": 5, "match": 5, "26": 5, "13": 5, "layer": 5, "lp": [], "abcd": 5, "aaaaaaa": 5, "abbbbb": 5, "abcc": 5, "squar": 5, "letter": 5, "l": 5, "undefin": [], "unfold": 5, "aaaaaaaaaaaaa": 5, "bbbbbbbbb": 5, "ccc": 5, "d": 5, "pictur": 5, "effort": 5, "conclus": 5, "11": 5, "h": 5, "zero": 5, "necessarili": 5, "consequ": 5, "fo": []}, "objects": {}, "objtypes": {}, "objnames": {}, "titleterms": {"The": [0, 1, 4, 7], "catalan": 0, "number": 0, "combin": 1, "biject": 1, "proof": 1, "pascal": 1, "s": 1, "triangl": 1, "binomi": 1, "theorem": 1, "asid": [1, 4], "count": [2, 3, 4], "function": 2, "ball": 2, "box": 2, "enum": 3, "combinator": [3, 9], "how": 3, "inclus": 4, "exclus": 4, "partit": [4, 5], "principl": 4, "derang": 4, "surject": 4, "set": 4, "integ": 5, "star": 6, "bar": 6, "twelvefold": 7, "wai": 7, "implement": 7, "graph": [8, 9], "theori": [8, 9], "some": 9, "mathemat": 9, "dyalog": 9, "apl": 9}, "envversion": {"sphinx.domains.c": 2, "sphinx.domains.changeset": 1, "sphinx.domains.citation": 1, "sphinx.domains.cpp": 6, "sphinx.domains.index": 1, "sphinx.domains.javascript": 2, "sphinx.domains.math": 2, "sphinx.domains.python": 3, "sphinx.domains.rst": 2, "sphinx.domains.std": 2, "sphinx.ext.intersphinx": 1, "sphinxcontrib.bibtex": 9, "sphinx": 56}})
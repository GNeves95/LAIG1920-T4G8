class GameState:
    def __init__(self, board):
        self.min = 99999
        self.max = -99999
        self.state = ''
        self.children = []
    
    def addChild(self, board):
        auxChild = GameState(board)
        self.children.append(auxChild)

def mainSolver(level, board, player):
    print(f'Solving')

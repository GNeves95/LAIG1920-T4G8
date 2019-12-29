class GameState:
    def __init__(self, board, movement):
        self.min = 99999
        self.max = -99999
        self.state = ''
        self.children = []
        self.move = movement
    
    def addChild(self, board,move):
        auxChild = GameState(board,move)
        self.children.append(auxChild)

def mainSolver(level, board, player):
    print(f'Solving')
    boardArray = board.split('|')
    #print(f'this is the boardArray {boardArray}')
    i = 7
    while i >= 0:
        j = 7
        while j >= 0:
            print(f'{boardArray[i*8+j]}', end = '')
            j -= 1
            if j >= 0:
                print(f' | ', end = '')
        print()
        i -= 1

#chessBoard = 'rw|kw|bw|Kw|qw|bw|kw|rw|pw|pw|pw|pw|pw|pw|pw|pw|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |pb|pb|pb|pb|pb|pb|pb|pb|rb|kb|bb|Kb|qb|bb|kb|rb|'

#mainSolver(1,chessBoard,1)

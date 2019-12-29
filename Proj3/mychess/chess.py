#import chess

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

def convertBoard(board):
    boardArray = board.split('|')
    i = 0
    while i < len(boardArray):
        if boardArray[i] == 'pw':
            boardArray[i] = 'P'
        elif boardArray[i] == 'rw':
            boardArray[i] = 'R'
        elif boardArray[i] == 'kw':
            boardArray[i] = 'N'
        elif boardArray[i] == 'bw':
            boardArray[i] = 'B'
        elif boardArray[i] == 'qw':
            boardArray[i] = 'Q'
        elif boardArray[i] == 'Kw':
            boardArray[i] = 'K'
        elif boardArray[i] == 'pb':
            boardArray[i] = 'p'
        elif boardArray[i] == 'rb':
            boardArray[i] = 'r'
        elif boardArray[i] == 'kb':
            boardArray[i] = 'n'
        elif boardArray[i] == 'bb':
            boardArray[i] = 'b'
        elif boardArray[i] == 'qb':
            boardArray[i] = 'q'
        elif boardArray[i] == 'Kb':
            boardArray[i] = 'k'
        else:
            boardArray[i] = '.'
        i += 1
    return boardArray

def getPossibleMoves(board):
    moves = []
    i = 0
    while i < 8*8:
        x = i%8
        y = ((i-(i%8))/8)
        orig = chr(ord('a')+(7-x))+str(8-y).split('.')[0]
        print(orig + " - " + board[i])
        if board[i] == 'P':
            if y == 1:
                moves.append('')

        board[i]
        i += 1

def mainSolver(level, board, player):
    print(f'Solving')
    boardArray = convertBoard(board)
    getPossibleMoves(boardArray)
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

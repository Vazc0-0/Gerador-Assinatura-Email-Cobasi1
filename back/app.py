from flask import Flask, jsonify, render_template
import pandas as pd
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)  # Permite requisições do frontend

@app.route('/')
def index():
    # Renderiza o HTML principal
    return render_template('index.html')

@app.route('/lojas', methods=['GET'])
def get_lojas():
    try:
        # Caminho relativo para o arquivo Excel
        excel_path = os.path.join(os.path.dirname(__file__), 'Lojas_Planilha.xlsx')
        
        # Lê o arquivo Excel
        df = pd.read_excel(excel_path)

        # Remove espaços extras dos nomes das colunas
        df.columns = df.columns.str.strip()

        # Verifica se há pelo menos duas colunas
        if len(df.columns) < 2:
            return jsonify({"error": "O arquivo Excel deve conter pelo menos duas colunas."}), 400

        # Seleciona as duas primeiras colunas
        df = df.iloc[:, :2]
        df.columns = ['codigo', 'nome']

        # Remove linhas com valores nulos
        lojas = df.dropna().to_dict(orient='records')

        return jsonify(lojas)
    except FileNotFoundError:
        return jsonify({"error": "Arquivo Excel não encontrado."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

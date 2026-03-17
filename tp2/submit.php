<?php
$nom = isset($_POST['nom']) ? htmlspecialchars($_POST['nom']) : '';


$prenom = isset($_POST['prenom']) ? htmlspecialchars($_POST['prenom']) : '';
$email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
$telephone = isset($_POST['telephone']) ? htmlspecialchars($_POST['telephone']) : '';
$dateNaissance = isset($_POST['dateNaissance']) ? $_POST['dateNaissance'] : '';
$genre = isset($_POST['genre']) ? htmlspecialchars($_POST['genre']) : '';

$pays = isset($_POST['pays']) ? htmlspecialchars($_POST['pays']) : '';
$ville = isset($_POST['ville']) ? htmlspecialchars($_POST['ville']) : '';

$password = isset($_POST['password']) ? password_hash($_POST['password'], PASSWORD_DEFAULT) : '';
$interets = isset($_POST['interets']) ? implode(', ', $_POST['interets']) : '';
$biographie = isset($_POST['biographie']) ? htmlspecialchars($_POST['biographie']) : '';
$cgu = isset($_POST['cgu']) ? 'Oui' : 'Non';

$photoName = '';
if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    $extension = pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION);
    $photoName = uniqid() . '.' . $extension;
    move_uploaded_file($_FILES['photo']['tmp_name'], $uploadDir . $photoName);
}

$header = ['Date_Inscription', 'Nom', 'Prenom', 'Email', 'Telephone', 'Date_Naissance', 'Genre', 'Pays', 'Ville', 'Password_Hash', 'Interets', 'Biographie', 'Photo', 'CGU'];
$data = [date('Y-m-d H:i:s'), $nom, $prenom, $email, $telephone, $dateNaissance, $genre, $pays, $ville, $password, $interets, $biographie, $photoName, $cgu];

$file = fopen('data.csv', 'a');

if (filesize('data.csv') == 0) {
    fputcsv($file, $header);
}

fputcsv($file, $data);
fclose($file);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Inscription Réussie</title>
    <style>
        body { font-family: sans-serif; text-align: center; padding: 50px; background: #f0f7f4; color: #2e4a3d; }
        .card { background: white; padding: 40px; border-radius: 12px; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        h1 { color: #66bb6a; }
        a { color: #66bb6a; text-decoration: none; font-weight: bold; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Inscription réussie !</h1>
        <p>Bienvenue <?php echo $prenom; ?>.</p>
        <p>Vos données ont été enregistrées.</p>
        <br>
        <a href="index.html">Retour au formulaire</a>
    </div>
</body>
</html>
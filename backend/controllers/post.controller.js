const PostModel = require("../models/post.model");

module.exports.getProjects = async (req, res) => {
  const projectsPortfolio = await PostModel.find();
  // res.json({ message: "test GET réussi!" });
  res.status(200).json(projectsPortfolio);
};

module.exports.setProject = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: "Merci d'ajouter un message" });
  }

  try {
    const projectPortfolio = await PostModel.create({
      id: req.body.id,
      title: req.body.title,
      technologie: req.body.technologie,
      icon: req.body.icon,
      picture: req.body.picture,
      mission: req.body.mission,
      skill: req.body.skill,
      siteUrl: req.body.siteUrl,
      github: req.body.github,
      moreInfo: req.body.moreInfo,
    });
    res.status(200).json(projectPortfolio);
  } catch (error) {
    res.status(500).json({
      message: "Une erreur s'est produite lors de la création du projet",
    });
  }
};

// module.exports.deletePost = async (req, res) => {
//   const post = await PostModel.findById(req.params.id);

//   if (!post) {
//     res.status(400).json({ message: "Ce post n'existe pas" });
//   }
//   await post.deleteOne({ _id: post });
//   res.status(200).json("Message supprimé " + req.params.id);
// };

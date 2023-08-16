import { useState } from "react";
import { toast } from 'react-toastify';
import { useAuth } from "../../hooks/auth";
import { Container, UserInfo } from "./styles";
import { ExplorerLogo } from "../../assets/ExplorerLogo";
import { Label } from "../../components/Label";
import { Input } from "../../components/Input";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Footer } from "../../components/Footer";

export function Profile() {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    newPassword: "",
    oldPassword: "",
  });

  const [inputValidation, setInputValidation] = useState({
    name: "",
    email: "",
    newPassword: "",
    oldPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleUpdate() {
    const { name, email, newPassword, oldPassword } = formData;
    const updatedValidation = { ...inputValidation };
  
    updatedValidation.name = name ? "" : "invalid";
    updatedValidation.email = email.match(/^\S+@\S+\.\S+$/) ? "" : "invalid";
    updatedValidation.newPassword = newPassword.length >= 6 ? "" : "invalid";
  
    setInputValidation(updatedValidation);
  
    if (!name || !email.match(/^\S+@\S+\.\S+$/) || (newPassword && newPassword.length < 6)) {
      return;
    }

    const updated = {
      name,
      email,
      password: newPassword,
      old_password: oldPassword
    };

    const userUpdated = { ...user, ...updated };

    setIsLoading(true);

    const error = await updateProfile({ user: userUpdated });

    if (error) {
      // Error handling logic...
    }

    setFormData({
      ...formData,
      newPassword: "",
      oldPassword: "",
    });

    setIsLoading(false);
  }

  return (
    <Container>
      <Header />
      <main>
        <ExplorerLogo size={120} />

        <UserInfo>
          <h1>Olá, {user.name}</h1>
          <p>Para atualizar seu cadastro, altere as informações abaixo:</p>

          <form onSubmit={e => e.preventDefault()}>
            <div className="input-wrapper">
              <Label title="Nome" htmlFor="name" />
              <Input
                id="name"
                type="text"
                validation={inputValidation.name}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="input-wrapper">
              <Label title="Email" htmlFor="email" />
              <Input
                id="email"
                type="email"
                validation={inputValidation.email}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="input-wrapper">
              <Label title="Senha atual" htmlFor="old-password"/>
              <Input
                id="old-password"  
                type="password"
                validation={inputValidation.oldPassword}
                value={formData.oldPassword}
                placeholder="Necessário para atualizar a senha"
                onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
              />
            </div>

            <div className="input-wrapper">
              <Label title="Nova Senha" htmlFor="new-password"/>
              <Input
                id="new-password"
                type="password"
                minLength="6"
                validation={inputValidation.newPassword}
                value={formData.newPassword}
                placeholder="Mínimo 6 caracteres"
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              />
            </div>

            <Button
              type="submit"
              title="Salvar Alterações"
              className="primary"
              loading={isLoading}
              onClick={handleUpdate}
            />
          </form>
        </UserInfo>
      </main>
      <Footer />
    </Container>
  );
}
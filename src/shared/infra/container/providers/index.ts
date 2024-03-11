import { TokenProvider } from "@modules/users/providers/implementations/TokenProvider";
import { ITokenProvider } from "@modules/users/providers/models/ITokenProvider";
import { container } from "tsyringe";

container.registerSingleton<ITokenProvider>(
    'TokenProvider',
    TokenProvider,
  );
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleService {
  private client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async verifyToken(idToken: string): Promise<{
    email: string;
    nome: string;
    foto: string | null;
    googleId: string;
  }> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      if (!payload || !payload.email || !payload.name || !payload.sub) {
        throw new UnauthorizedException('Token do Google inválido');
      }

      return {
        email: payload.email,
        nome: payload.name,
        foto: payload.picture ?? null,
        googleId: payload.sub,
      };
    } catch {
      throw new UnauthorizedException('Token do Google inválido');
    }
  }
}
